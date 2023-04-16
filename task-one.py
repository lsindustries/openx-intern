def lenghtoflongest(s):
    sub = {}
    start = 0
    end = 0
    max_len = 0
    all_strings = []
    while end < len(s):
        if s[end] in sub and sub[s[end]] >= start:
            start = sub[s[end]] + 1

        max_len = max(max_len, end - start + 1)

        sub[s[end]] = end
        end += 1
        all_strings.append(s[start:end])
    longest = ["'"+longs+"'" for longs in all_strings if len(longs) == max_len]
    dat = ', '.join(longest)
    print(f"The answer is {dat}, with the length of {max_len}.")
    return max_len

