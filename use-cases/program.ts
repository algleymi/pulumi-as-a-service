import {
  InlineProgramArgs,
  LocalWorkspace,
  PulumiFn,
} from "@pulumi/pulumi/automation";
import { workspaceOptionsWith } from "../pulumi-configuration";

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

  return await LocalWorkspace.createOrSelectStack(args, stackConfiguration);
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
