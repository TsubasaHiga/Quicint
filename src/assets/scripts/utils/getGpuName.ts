import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'

const GetGpuName = (renderer: WebGLRenderer): string => {
  const gl = renderer.getContext()

  if (!gl) {
    return ''
  }

  // ドライバー情報を取得
  const ext = gl.getExtension('WEBGL_debug_renderer_info')
  // GPU名を取得
  const name = !ext ? '' : gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)

  return name
}

export default GetGpuName
