# 生成5秒Dash切片

```bash
ffmpeg -hide_banner -y -i sea.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -seg_duration 5 -f dash sea/sea.mpd
```

- `-hide_banner`: 隐藏 FFmpeg 的启动信息和版权声明。
- `-y`: 覆盖任何现有输出文件而不进行提示。
- `-i ./sea.mp4`: 指定输入的视频文件路径为 `./sea.mp4`。
- `-c:v libx264 -crf 23 -preset medium`: 使用 libx264 编码器对视频进行压缩，其中 `-crf 23` 设置了视频的质量（较低的值表示更高的质量），`-preset medium` 设置了编码速度和压缩效率之间的平衡。
- `-c:a aac -b:a 128k`: 使用 AAC 编码器对音频进行压缩，并设置音频比特率为 128kbps。
- `-seg_duration 5`: 设置每个切片的时长为 5 秒。
- `-f dash`: 指定输出为 DASH 格式。
- `./sea/sea.mpd`: 指定输出的 DASH 文件路径为 `./sea/sea.mpd`

# 分别压缩不同清晰度并切片

```bash
ffmpeg -hide_banner -y -i sea.mp4 -vf "scale=-2:320" -c:v libx264 -b:v 400k -profile:v baseline -s 320x180 -c:a aac -b:a 128k -seg_duration 5 -f dash output/320p/stream.mpd

ffmpeg -hide_banner -y -i sea.mp4 -vf "scale=-2:480" -c:v libx264 -b:v 800k -profile:v main -s 854x480 -c:a aac -b:a 128k -seg_duration 5 -f dash output/480p/stream.mpd

ffmpeg -hide_banner -y -i sea.mp4 -vf "scale=-2:720" -c:v libx264 -b:v 1500k -profile:v main -s 1280x720 -c:a aac -b:a 128k -seg_duration 5 -f dash -y output/720p/stream.mpd

ffmpeg -hide_banner -y -i sea.mp4 -vf "scale=-2:1080" -c:v libx264 -b:v 3000k -profile:v high -s 1920x1080 -c:a aac -b:a 128k -seg_duration 5 -f dash -y output/1080p/stream.mpd
```
