import {EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";


export const handler = async () => {
  await startLinux();
  await startWindows(); 

  const message = `Lab starting...
  Instances created: 2`;

  console.log(message);

  return;

};


async function startLinux() {

  const linux = new EC2Client({});

  const command = new RunInstancesCommand({
    MinCount: 1,
    MaxCount: 1,
    LaunchTemplate: {
      LaunchTemplateId: "lt-xxxxxxxxxxxxxxxxx" // replace with actual template id
    }
  });

  return await linux.send(command);
}

async function startWindows() {

  const windows = new EC2Client({});

  const command = new RunInstancesCommand({
    MinCount: 1,
    MaxCount: 1,
    LaunchTemplate: {
      LaunchTemplateId: "lt-xxxxxxxxxxxxxxxxx"
    }
  });

  return await windows.send(command);
}
