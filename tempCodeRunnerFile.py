b-9f81-6e0030b7a8e3.wav", "rb") as handle:
#     params = handle.getparams()
#     # only read the first 10 seconds of audio
#     frames = handle.readframes(441000)
#     print(handle.tell())
#     print(handle.getframerate())

# print(params)
# params = list(params)
# params[3] = len(frames)
# print(params)

# with wave.open("./audio/03d8ba1e-6929-441b-9f81-6e0030b7a8e3.wav", "wb") as handle:
#     handle.setparams(params)
#     # handle.writeframes(frames)
#     handle.setframerate(16000)