import { closeWebrtc } from '../../utils/webrtc';

export function closeAllWebrtc() {
    return (dispatch, getState) => {
      const { webrtcUrl } = getState().game.play;
      const { front, top } = webrtcUrl;
      if (front && front.pc !== undefined) closeWebrtc(front.pc, front.rtsp, front.webrtcServer);
      if (top && top.pc !== undefined) closeWebrtc(top.pc, top.rtsp, top.webrtcServer);
      dispatch({ type: 'CLEAR_WEBRTC_URL' });
    };
  }