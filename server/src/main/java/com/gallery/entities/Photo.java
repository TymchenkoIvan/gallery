package com.gallery.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 3, max = 50)
    private String name;

    @Size(min = 3, max = 500)
    private String description;

    @NotNull
    private String photoLocation;

    @NotNull
    private String thumbnailLocation;

    @NotNull
    private String cropLocation;

    @NotNull
    private Date originalDate;

    @Lob
    byte[] content;

    @NotNull
    boolean isVisible;

    @NotNull
    boolean isPrivate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id", nullable = false)
    private Album album;

    public Photo() {
    }

    public Photo(String name, String photoLocation, String thumbnailLocation, Date originalDate) {
        this.name = name;
        this.photoLocation = photoLocation;
        this.thumbnailLocation = thumbnailLocation;
        this.originalDate = originalDate;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public String getPhotoLocation() {
        return photoLocation;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhotoLocation(String photoLocation) {
        this.photoLocation = photoLocation;
    }

    public void setThumbnailLocation(String thumbnailLocation) {
        this.thumbnailLocation = thumbnailLocation;
    }

    public String getThumbnailLocation() {
        return thumbnailLocation;
    }

    public Date getOriginalDate() {
        return originalDate;
    }

    public void setOriginalDate(Date originalDate) {
        this.originalDate = originalDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isVisible() {
        return isVisible;
    }

    public void setVisible(boolean visible) {
        isVisible = visible;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public String getCropLocation() {
        return cropLocation;
    }

    public void setCropLocation(String cropLocation) {
        this.cropLocation = cropLocation;
    }
}
