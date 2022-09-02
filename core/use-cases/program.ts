import {
  InlineProgramArgs,
  LocalWorkspace,
  PulumiFn,
} from "@pulumi/pulumi/automation";
import { workspaceOptionsWith, getRegion } from "../pulumi-configuration";

async function setupStack(program: PulumiFn) {
  const stackName = "dev";

  const args: InlineProgramArgs = {
    // TODO: inject this
    stackName,
    // TODO: inject this
    projectName: "inlineNode",
    program: program,
  };

  const stackConfiguration = workspaceOptionsWith(stackName);

  const stack = await LocalWorkspace.createOrSelectStack(
    args,
    stackConfiguration
  );
  const region = getRegion();

  if (!region)
    throw new Error(
      `No region set, are you sure you set the AWS_REGION variable?`
    );

  await stack.workspace.installPlugin("aws", "v4.0.0");
  await stack.setConfig("aws:region", { value: region });
  return stack;
}

export async function createProgram(program: PulumiFn) {
  const stack = await setupStack(program);
  await stack.refresh({ onOutput: console.info });

  await stack.up({ onOutput: console.info });
}

export async function destroyProgram(program: PulumiFn) {
  const stack = await setupStack(program);
  await stack.refresh({ onOutput: console.info });

  await stack.destroy({ onOutput: console.info });
}
