package com.gerdastan.gerdastan_api.file;

import jakarta.persistence.*;

@Entity
public class FileEntity {
    @Enumerated
    @Column(name = "file_type")
    private FileType fileType;

    @Column(name = "file")
    private String file;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    public FileType getFileType() {
        return fileType;
    }

    public void setFileType(FileType fileType) {
        this.fileType = fileType;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
