package com.gallery.services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

@Service
public class CropPhotoService {

    @Value( "${gallery.thumbnail.width}" )
    private Integer thumbnailWidth;

    @Value( "${gallery.thumbnail.height}" )
    private Integer thumbnailHeight;

    @Value( "${gallery.crop.width}" )
    private Integer cropWidth;

    @Value( "${gallery.crop.height}" )
    private Integer cropHeight;

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

    public BufferedImage prepareCrop(byte[] content) throws Exception{
        BufferedImage crop = toBufferedImage(content);
        return Thumbnails.of(crop)
                .size(cropWidth, cropHeight)
                .outputFormat(fileFormat)
                .asBufferedImage();
    }

    private BufferedImage toBufferedImage(byte[] imageData) {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        try {
            return ImageIO.read(bais);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
