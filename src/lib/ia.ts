export async function gerarSimulacaoIA(
  foto: File,
  procedimento: string,
  ml: number,
  intensidade: string,
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1600))

  return URL.createObjectURL(foto) + `#simulada-${procedimento}-${ml}-${intensidade}`
}
