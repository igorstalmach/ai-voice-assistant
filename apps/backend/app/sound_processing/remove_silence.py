from pydub import AudioSegment
from pydub.silence import split_on_silence


def remove_silence(audio: AudioSegment, silence_thresh=-40, min_silence_len=500):
    chunks = split_on_silence(
        audio,
        min_silence_len=min_silence_len,
        silence_thresh=silence_thresh,
    )

    non_silent_audio = AudioSegment.empty()
    for chunk in chunks:
        non_silent_audio += chunk

    return non_silent_audio
