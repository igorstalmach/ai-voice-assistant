from pydub import AudioSegment
from pydub.silence import split_on_silence


def remove_silence(audio: AudioSegment, silence_thresh=-40, min_silence_len=500):
    """
    Remove silence from an audio file.

    :param audio: Audio file stored in a buffer.
    :param silence_thresh: Silence threshold in dB.
    :param min_silence_len: Minimum silence length in milliseconds.
    :return: Processed audio file without silence.
    """

    chunks = split_on_silence(
        audio,
        min_silence_len=min_silence_len,
        silence_thresh=silence_thresh,
    )

    non_silent_audio = AudioSegment.empty()
    for chunk in chunks:
        non_silent_audio += chunk

    return non_silent_audio
