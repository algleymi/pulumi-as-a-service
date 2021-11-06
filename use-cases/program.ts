import {
  InlineProgramArgs,
  LocalWorkspace,
  PulumiFn,
} from "@pulumi/pulumi/automation";
import { PulumiConfiguration } from "../pulumi-configuration";

async function setupStack(program: PulumiFn, secretsProvider: string) {
  const args: InlineProgramArgs = {
    // TODO: inject this
    stackName: "dev",
    // TODO: inject this
    projectName: "inlineNode",
    program: program,
  };

  return await LocalWorkspace.createOrSelectStack(args, {
    secretsProvider,
    stackSettings: {
      [args.stackName]: {
        secretsProvider,
      },
    },
  });
}

export async function createProgram(
  program: PulumiFn,
  { secretsProvider }: PulumiConfiguration
) {
  const stack = await setupStack(program, secretsProvider);
  await stack.refresh({ onOutput: console.info });

  await stack.up({ onOutput: console.info });
}

export async function destroyProgram(
  program: PulumiFn,
  { secretsProvider }: PulumiConfiguration
) {
  const stack = await setupStack(program, secretsProvider);
  await stack.refresh({ onOutput: console.info });

  await stack.destroy({ onOutput: console.info });
}
