export async function validateResponse(res: Response): Promise<Response> {
    if (!res.ok) {
        throw new Error(await res.text())
    }
    return res
}
