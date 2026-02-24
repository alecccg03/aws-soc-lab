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


### *Simulating RDP Brute Force attack to test logs and alerting*

**Execution:** Executed a manual brute force attempt via RDP by entering 20+ incorrect password attempts within minutes.

**Evidence A:** Cloudwatch log insights showing consecutive attempts to port 3389 from the attacker's IP. 

**Evidence B:** GuardDuty Finding - UnauthorizedAccess:EC2/RDPBruteForce


