package com.gallery.services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

@Service
public class CropPhotoService {

    @Value( "${gallery.thumbnail.width}" )
    private Integer thumbnailWidth;

    @Value( "${gallery.thumbnail.height}" )
    private Integer thumbnailHeight;

    @Value( "${gallery.content.width}" )
    private Integer contentWidth;

    @Value( "${gallery.content.height}" )
    private Integer contentHeight;

    @Value( "${gallery.file.format}" )
    private String fileFormat;

    public BufferedImage prepareThumbnail(byte[] content) throws Exception {
        BufferedImage thumbnail = toBufferedImage(content);

        return Thumbnails.of(thumbnail)
                .crop(Positions.CENTER)
                .size(thumbnailWidth, thumbnailHeight)
                .outputFormat(fileFormat)
                .asBufferedImage();
    }

    public byte[] cropImage(FileSystemResource content) throws IOException {
        byte[] contentBytes = Files.readAllBytes(Paths.get(content.getPath()));
        BufferedImage image = toBufferedImage(contentBytes);
        image = Thumbnails.of(image)
                .size(contentWidth, contentHeight)
                .outputFormat(fileFormat)
                .asBufferedImage();
        return toByteArray(image);
    }

    private BufferedImage toBufferedImage(byte[] imageData) {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        try {
            return ImageIO.read(bais);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private byte[] toByteArray(BufferedImage bi) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(bi, fileFormat, baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
