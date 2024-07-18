export type Caster = {
  backendUrl: string;
  name: string;
}



const caster1: Caster = {
  name: "Caster 1",
  backendUrl: "https://devnet.com",
}

const caster2: Caster = {
  name: "Caster 2",
  backendUrl: "https://devnet.com",
}

export const casters: Caster[] = [caster1, caster2]