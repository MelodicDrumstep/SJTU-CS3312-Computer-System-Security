set(LLVM_LINK_COMPONENTS
  Support
  )

set(LLVM_EXPORTED_SYMBOL_FILE ${CMAKE_CURRENT_SOURCE_DIR}/CryptoStreamCheckerPlugin.exports)
add_llvm_library(CryptoStreamCheckerPlugin MODULE BUILDTREE_ONLY CryptoStreamChecker.cpp)

clang_target_link_libraries(CryptoStreamCheckerPlugin PRIVATE
  clangAnalysis
  clangAST
  clangStaticAnalyzerCore
  clangStaticAnalyzerFrontend
  )
