import {
  InlineProgramArgs,
  LocalWorkspace,
  PulumiFn,
} from "@pulumi/pulumi/automation";

async function setupStack(program: PulumiFn) {
  const args: InlineProgramArgs = {
    // TODO: inject this
    stackName: "dev",
    // TODO: inject this
    projectName: "inlineNode",
    program: program,
  };

  // TODO: inject this
  const secretsProvider = `awskms://alias/${process.env.KMS_KEY_ALIAS}`;

  return await LocalWorkspace.createOrSelectStack(args, {
    secretsProvider,
    stackSettings: {
      [args.stackName]: {
        secretsProvider,
      },
    },
  });
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
