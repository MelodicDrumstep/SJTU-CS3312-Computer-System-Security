#include "clang/StaticAnalyzer/Core/BugReporter/BugType.h"
#include "clang/StaticAnalyzer/Core/Checker.h"
#include "clang/StaticAnalyzer/Core/PathSensitive/CheckerContext.h"
#include "clang/StaticAnalyzer/Frontend/CheckerRegistry.h"

using namespace clang;
using namespace ento;

namespace {

class CryptoMisuseChecker : public Checker<check::PreStmt<CallExpr>> {
  mutable std::unique_ptr<BugType> BT;

public:
  void checkPreStmt(const CallExpr *CE, CheckerContext &C) const;
};

} // end anonymous namespace

void CryptoMisuseChecker::checkPreStmt(const CallExpr *CE, CheckerContext &C) const {
  const Expr *Callee = CE->getCallee()->IgnoreParenImpCasts();
  const FunctionDecl *FD = C.getSVal(Callee).getAsFunctionDecl();

  if (!FD)
    return;

  IdentifierInfo *II = FD->getIdentifier();
  if (!II)
    return;

  StringRef FuncName = II->getName();

  // Example 1: Check if the encryption function is called with a null key.
  if (FuncName == "encrypt") {
    if (CE->getNumArgs() < 2)
      return;

    const Expr *KeyArg = CE->getArg(1);
    SVal KeyVal = C.getSVal(KeyArg);

    // Detect if the second argument (key) is a null pointer.
    if (KeyVal.isZeroConstant()) {
      ExplodedNode *N = C.generateErrorNode();
      if (!N)
        return;

      if (!BT)
        BT.reset(new BugType(this, "Insecure encryption key",
                            "CryptoMisuseChecker"));

      auto report = std::make_unique<PathSensitiveBugReport>(
          *BT, "Calling 'encrypt' with a null key is insecure.", N);
      report->addRange(KeyArg->getSourceRange());
      C.emitReport(std::move(report));
    }
  }

  // Example 2: Check for use of a deprecated or unsafe crypto function.
  if (FuncName == "deprecated_crypto") {
    ExplodedNode *N = C.generateErrorNode();
    if (!N)
      return;

    if (!BT)
      BT.reset(new BugType(this, "Use of deprecated crypto function",
                          "CryptoMisuseChecker"));

    auto report = std::make_unique<PathSensitiveBugReport>(
        *BT, "Calling deprecated crypto function is insecure.", N);
    report->addRange(Callee->getSourceRange());
    C.emitReport(std::move(report));
  }
}

// Register the checker plugin with Clang
extern "C" void clang_registerCheckers(CheckerRegistry &registry) {
  registry.addChecker<CryptoMisuseChecker>(
      "plugin.CryptoMisuseChecker",
      "Detects misuse of cryptographic functions (e.g., null keys or deprecated functions)",
      "");
}

// Required API version string for Clang Static Analyzer plugins
extern "C" const char clang_analyzerAPIVersionString[] =
    CLANG_ANALYZER_API_VERSION_STRING;
