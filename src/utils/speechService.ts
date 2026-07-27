// Speech synthesis and recognition utilities

export const speakText = (text: string, onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API not supported');
    return;
  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.lang = "en-US";

  const voices = speechSynthesis.getVoices();

  if (voices.length > 0) {
    utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
  }

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (e) => {
    console.error("Speech error:", e);
    onEnd?.();
  };

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
window.speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};