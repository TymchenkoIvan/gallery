package com.gallery.repositories;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Repository;

import com.gallery.services.CropPhotoService;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

@Repository
public class FileSystemRepository {

    @Value( "${gallery.resource.directory}" )
    private String resourcesDir;

    @Value( "${gallery.prefix}" )
    private String galleryPrefix;

    @Value( "${gallery.file.format}" )
    private String fileFormat;

    @Value( "${gallery.thumbnail.prefix}" )
    private String thumbnailPrefix;

    private final CropPhotoService cropPhotoService;

    public FileSystemRepository(CropPhotoService cropPhotoService) {
        this.cropPhotoService = cropPhotoService;
    }

    public String saveOriginal(byte[] content, String imageName) throws Exception {
        String fileLocation = galleryPrefix + imageName + "_" + new Date().getTime();
        return save(content, fileLocation);
    }

    public String saveThumbnail(byte[] content, String imageName) throws Exception {
        String fileLocation = galleryPrefix + imageName + "_" + new Date().getTime() + thumbnailPrefix;
        BufferedImage thumbnail = cropPhotoService.prepareThumbnail(content);
        return save(toByteArray(thumbnail), fileLocation);
    }

    private String save(byte[] content, String fileLocation) throws Exception {
        Path newFile = Paths.get(resourcesDir + fileLocation + "." + fileFormat);
        Files.createDirectories(newFile.getParent());

        Files.write(newFile, content);

        return fileLocation + "." + fileFormat;
    }

    public FileSystemResource findInFileSystem(String location) {
        try {
            return new FileSystemResource(resourcesDir + location);
        } catch (Exception e) {
            throw new RuntimeException();
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
