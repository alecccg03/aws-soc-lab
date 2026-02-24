import { EC2Client, DescribeInstancesCommand, TerminateInstancesCommand } from "@aws-sdk/client-ec2";

export const handler = async () => {
  const terminate = await terminateInstances();
  const message = `Lab shutting down 
  Instances terminated: ${terminate.TerminatingInstances.length}`;

  console.log(message);

  return;
};

async function terminateInstances() {
  const client = new EC2Client({});
  const instances = await getInstances();
  const instanceArray = instances.Reservations; 
  var instanceIds = [];

  instanceArray.forEach(e => {
    instanceIds.push(e.Instances[0].InstanceId);
  }) 

  const input = {
    InstanceIds: instanceIds
  };
  const command = new TerminateInstancesCommand(input);
  const response = await client.send(command);

  return response;

}


async function getInstances() {
  const client = new EC2Client({});
  const input = {
    Filter: [
      {
        Name: "instance.group-id",
        Values: ["sg-xxxxxxxxxxxxxxxxx"]
      },
      {
        Name: "instance-state-name",
        Values: ["running", "pending", "shutting-down", "stopping", "stopped"]
      }
    ]
  };

  const command = new DescribeInstancesCommand(input);
  const response = await client.send(command);

  return response;
}
