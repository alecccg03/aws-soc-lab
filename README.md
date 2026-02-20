# AWS-SOC-Lab


## **Project Overview** 

I built a cloud-native SOC environment on AWS to simulate real-world attacks (Brute Force, Reconnaissance, C&C) and automate detection using GuardDuty, Security Hub and EventBridge

<img width="762" height="731" alt="Architecture Diagram" src="https://github.com/user-attachments/assets/2fcf07d6-47b8-40ac-91b5-58ee07039f05" />


### *Traffic Flow:*
1. The attacker simulates traffic on the VPC from nmap scans, failed RDP connections, and ping commands
2. VPC Flow Logs capture the traffic and send it to GuardDuty and CloudWatch
3. GuardDuty analyzes the logs and generates findings
4. When a High severity finding is fenerated, EventBridge catches the finding and triggers an SNS alert via email


## **Tools & Technologies** 
*AWS Services:* EC2, VPC, IAM, Lambda, CloudWatch, Amazon EventBridge, SNS

*Security Tools:* Nmap (Recon), RDP (Brute Force)

*Languages:* Node.js (Lambda functions)
