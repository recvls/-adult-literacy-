// Speech synthesis and recognition utilities

export const speakText = (text: string, onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API not supported');
    return;
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  if (onEnd) {
    utterance.onend = onEnd;
  }

  speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
};

export const isSpeechSynthesisSupported = () => 'speechSynthesis' in window;

export const startSpeechRecognition = (
  onResult: (transcript: string) => void,
  onError?: (error: string) => void,
  onEnd?: () => void
) => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech Recognition API not supported');
    onError?.('Speech Recognition not supported on this device');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event: any) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    onResult(transcript.trim());
  };

  recognition.onerror = (event: any) => {
    onError?.(event.error);
  };

  recognition.onend = () => {
    onEnd?.();
  };

  recognition.start();

  return recognition;
};

export const stopSpeechRecognition = (recognition: any) => {
  if (recognition) {
    recognition.stop();
  }
};

export const isSpeechRecognitionSupported = () => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  return !!SpeechRecognition;
};
