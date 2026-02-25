# AWS-SOC-Lab


## **Project Overview** 

I built a cloud-native SOC environment on AWS designed with intentional architectural flaws to simulate real-world attack vectors. This lab serves as a testing ground for Brute Force, Reconnaissance, and C&C activity, using GuardDuty, Security Hub, and EventBridge to automate the end-to-end detection and notification pipeline. Lambda functions were used to manage EC2 instance states and keep costs at a minimum.


<img width="762" height="731" alt="Architecture Diagram" src="https://github.com/user-attachments/assets/2fcf07d6-47b8-40ac-91b5-58ee07039f05" />


### *Traffic Flow:*
1. The attacker simulates traffic on the VPC from nmap scans, failed RDP connections, and ping commands
2. VPC Flow Logs capture the traffic and send it to GuardDuty and CloudWatch
3. GuardDuty analyzes the logs and generates findings
4. When a High severity finding is fenerated, EventBridge catches the finding and triggers an SNS alert via email


## *Tools & Technologies*
**AWS Services:** EC2, VPC, IAM, Lambda, CloudWatch, GuardDuty, Amazon EventBridge, SNS

**Security Tools:** Nmap (Recon), RDP (Brute Force)

**Languages:** Node.js (Lambda functions)


## **Attacks** 


### *Simulating RDP brute force attack to test logs and alerting*

**Execution:** Executed a manual brute force attempt via RDP by entering 20+ incorrect password attempts within minutes

**Detection:** Cloudwatch log insights showing consecutive attempts to port 3389 from the attacker's IP; GuardDuty Finding - UnauthorizedAccess:EC2/RDPBruteForce

**Purpose:** If an attacker guesses your credentials and gains access to your machine, the damage could be unrecoverable. You need to make sure your logs correctly identify unauthorized access and brute force attacks

<img width="850" height="432" alt="RDP Brute Force" src="https://github.com/user-attachments/assets/f38351bf-c5db-4fd6-b299-5bc9d3e76fa9" />
<img width="850" height="377" alt="RDP Access" src="https://github.com/user-attachments/assets/698d0250-126c-4b27-b670-dbf57ce1163f" />




### *Nmap port scan on EC2 instance* 

**Execution:** Performed an nmap scan from a Linux VM on the EC2 instance 

**Detection:** Cloudwatch logs show several hundred connection attempts from the VM to various ports on the EC2 instance in less than 60 seconds 

**Purpose:** It is good to know if an unknown IP is running a port scan on your instances. Nmap can provide the attacker open ports, OS, service versions, etc. which they can use to get access or run attacks on your network.


### *Simulating a connection to a known Command & Control server*

**Execution:** Ran a ping command from the EC2 instance to a known malicious test domain provided by AWS for testing

**Detection:** GuardDuty Finding - Backdoor:EC2/C&CActivity.B!DNS

**Purpose:** C2C servers allow attackers to issue real-time commands on the affected machines and exfiltrate data. You should be aware if any of your instances are making regular connections to suspicious domains or a known malicious IP address
