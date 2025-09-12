import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface AudioProps {
  audio: string;
  autoPlay?: boolean;
}

export const Audio = ({ audio, autoPlay }: AudioProps) => {
  const audioRef = useRef(null);

  useEffect(() => {}, [audioRef]);

  return (
    <ContainerAudio
      ref={audioRef}
      key={autoPlay}
      src={audio}
      autoPlay={autoPlay}
      preload="none"
      controls
    />
  );
};

const ContainerAudio = styled.audio`
  visibility: hidden;
`;
