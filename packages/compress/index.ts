import ffmpeg from "fluent-ffmpeg";
import sharp from "sharp"

function transcodeVideo(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                '-c:v libx264',
                '-crf 23',
                '-preset veryfast',
                '-movflags +faststart'
            ])
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .run();
    });
}

function compressImage(inputPath, outputPath) {
    return sharp(inputPath)
        .resize(1280, 720, { // Example resize, adjust as needed
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFormat('jpeg', { quality: 80 }) // Adjust quality as needed
        .toFile(outputPath);
}

export { transcodeVideo, compressImage };