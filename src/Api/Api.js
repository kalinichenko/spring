export const httpGet = async url => {
  try {
    const result = await fetch(url);
    return !result.ok ? {
      error: result.status,
    } : {
      data: await result.json()
    }
  } catch({message}) {
    return {
      error: message
    }
  }
}
