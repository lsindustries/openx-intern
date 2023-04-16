def lenghtoflongest(s):
    sub = {}
    start = 0
    end = 0
    max_len = 0

    while end < len(s):
        if s[end] in sub and sub[s[end]] >= start:
            start = sub[s[end]] + 1
        max_len = max(max_len, end - start + 1)
        sub[s[end]] = end
        end += 1
    return max_len

