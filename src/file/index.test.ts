import { describe, expect, it } from "vitest";
import { formatBytes, matchesAccept } from "./index";

describe("formatBytes", () => {
  it("formats zero bytes correctly", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
  });

  it("formats bytes without decimals when precision is 0", () => {
    expect(formatBytes(512, 0)).toBe("512 Bytes");
  });

  it("formats bytes with default precision", () => {
    expect(formatBytes(1024)).toBe("1.00 KB");
  });

  it("respects the precision parameter", () => {
    expect(formatBytes(1536, 1)).toBe("1.5 KB");
    expect(formatBytes(1536, 3)).toBe("1.500 KB");
  });

  it("clamps negative precision values to zero", () => {
    expect(formatBytes(1536, -1)).toBe("2 KB");
  });

  it("automatically selects the appropriate unit", () => {
    expect(formatBytes(1024)).toBe("1.00 KB");
    expect(formatBytes(1024 ** 2)).toBe("1.00 MB");
    expect(formatBytes(1024 ** 3)).toBe("1.00 GB");
  });

  it("does not exceed the maximum supported unit", () => {
    expect(formatBytes(1024 ** 5)).toBe("1024.00 TB");
  });

  it("uses the forced unit when provided", () => {
    expect(formatBytes(1024 ** 2, 2, "KB")).toBe("1024.00 KB");
    expect(formatBytes(1024 ** 2, 0, "MB")).toBe("1 MB");
  });

  it("formats non-integer byte values correctly", () => {
    expect(formatBytes(1536.5, 2)).toBe("1.50 KB");
  });
});

describe("matchesAccept", () => {
  describe("wildcard accept", () => {
    it('should accept all files when accept is "*"', () => {
      expect(matchesAccept("any-file.xyz", "application/unknown", "*")).toBe(true);
      expect(matchesAccept("photo.jpg", "image/jpeg", "*")).toBe(true);
      expect(matchesAccept(".gitignore", "text/plain", "*")).toBe(true);
    });
  });

  describe("file extension matching", () => {
    it("should match single extension", () => {
      expect(matchesAccept("photo.jpg", "image/jpeg", ".jpg")).toBe(true);
      expect(matchesAccept("document.pdf", "application/pdf", ".pdf")).toBe(true);
    });

    it("should match multiple extensions", () => {
      expect(matchesAccept("photo.jpg", "image/jpeg", ".jpg,.png,.gif")).toBe(true);
      expect(matchesAccept("image.png", "image/png", ".jpg,.png,.gif")).toBe(true);
      expect(matchesAccept("icon.gif", "image/gif", ".jpg,.png,.gif")).toBe(true);
    });

    it("should be case-insensitive for extensions", () => {
      expect(matchesAccept("photo.JPG", "image/jpeg", ".jpg")).toBe(true);
      expect(matchesAccept("photo.jpg", "image/jpeg", ".JPG")).toBe(true);
      expect(matchesAccept("DOCUMENT.PDF", "application/pdf", ".pdf")).toBe(true);
    });

    it("should not match wrong extension", () => {
      expect(matchesAccept("photo.jpg", "image/jpeg", ".png")).toBe(false);
      expect(matchesAccept("document.pdf", "application/pdf", ".doc")).toBe(false);
    });

    it("should handle files without extension", () => {
      expect(matchesAccept("README", "text/plain", ".txt")).toBe(false);
      expect(matchesAccept("Makefile", "text/plain", ".txt")).toBe(false);
    });

    it("should handle hidden files (starting with dot)", () => {
      expect(matchesAccept(".gitignore", "text/plain", ".gitignore")).toBe(false);
      expect(matchesAccept(".env", "text/plain", ".env")).toBe(false);
    });

    it("should handle files with multiple dots", () => {
      expect(matchesAccept("archive.tar.gz", "application/gzip", ".gz")).toBe(true);
      expect(matchesAccept("backup.2024.tar.gz", "application/gzip", ".gz")).toBe(true);
    });
  });

  describe("MIME type wildcard matching", () => {
    it("should match image wildcard", () => {
      expect(matchesAccept("photo.jpg", "image/jpeg", "image/*")).toBe(true);
      expect(matchesAccept("photo.png", "image/png", "image/*")).toBe(true);
      expect(matchesAccept("photo.gif", "image/gif", "image/*")).toBe(true);
      expect(matchesAccept("photo.webp", "image/webp", "image/*")).toBe(true);
    });

    it("should match video wildcard", () => {
      expect(matchesAccept("clip.mp4", "video/mp4", "video/*")).toBe(true);
      expect(matchesAccept("clip.webm", "video/webm", "video/*")).toBe(true);
    });

    it("should match audio wildcard", () => {
      expect(matchesAccept("song.mp3", "audio/mpeg", "audio/*")).toBe(true);
      expect(matchesAccept("sound.wav", "audio/wav", "audio/*")).toBe(true);
    });

    it("should not match wrong MIME type category", () => {
      expect(matchesAccept("video.mp4", "video/mp4", "image/*")).toBe(false);
      expect(matchesAccept("photo.jpg", "image/jpeg", "video/*")).toBe(false);
    });
  });

  describe("exact MIME type matching", () => {
    it("should match exact MIME type", () => {
      expect(matchesAccept("photo.jpg", "image/jpeg", "image/jpeg")).toBe(true);
      expect(matchesAccept("photo.png", "image/png", "image/png")).toBe(true);
      expect(matchesAccept("document.pdf", "application/pdf", "application/pdf")).toBe(true);
    });

    it("should not match different MIME type", () => {
      expect(matchesAccept("photo.jpg", "image/jpeg", "image/png")).toBe(false);
      expect(matchesAccept("photo.png", "image/png", "image/jpeg")).toBe(false);
    });
  });

  describe("mixed rules", () => {
    it("should match any rule in comma-separated list", () => {
      const accept = "image/*,.pdf,.doc";

      expect(matchesAccept("photo.jpg", "image/jpeg", accept)).toBe(true);
      expect(matchesAccept("document.pdf", "application/pdf", accept)).toBe(true);
      expect(matchesAccept("report.doc", "application/msword", accept)).toBe(true);
    });

    it("should handle spaces in accept string", () => {
      const accept = "image/*, .pdf, .doc";

      expect(matchesAccept("photo.jpg", "image/jpeg", accept)).toBe(true);
      expect(matchesAccept("document.pdf", "application/pdf", accept)).toBe(true);
    });

    it("should not match when no rules match", () => {
      const accept = "image/*,.pdf,.doc";

      expect(matchesAccept("video.mp4", "video/mp4", accept)).toBe(false);
      expect(matchesAccept("data.csv", "text/csv", accept)).toBe(false);
    });
  });

  describe("path handling", () => {
    it("should handle Unix-style paths", () => {
      expect(matchesAccept("/path/to/photo.jpg", "image/jpeg", ".jpg")).toBe(true);
      expect(matchesAccept("/home/user/document.pdf", "application/pdf", ".pdf")).toBe(true);
    });

    it("should handle Windows-style paths", () => {
      expect(matchesAccept("C:\\Users\\photos\\image.png", "image/png", ".png")).toBe(true);
      expect(
        matchesAccept(
          "D:\\Documents\\report.docx",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ".docx",
        ),
      ).toBe(true);
    });

    it("should handle mixed path separators", () => {
      expect(matchesAccept("C:/Users/photos/image.jpg", "image/jpeg", ".jpg")).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle empty extension", () => {
      expect(matchesAccept("file", "application/octet-stream", ".txt")).toBe(false);
    });

    it("should handle empty accept rules (after trimming)", () => {
      expect(matchesAccept("file.txt", "text/plain", "")).toBe(false);
      expect(matchesAccept("file.txt", "text/plain", ",")).toBe(false);
      expect(matchesAccept("file.txt", "text/plain", ", ,")).toBe(false);
    });

    it("should handle file name with only extension", () => {
      expect(matchesAccept(".htaccess", "text/plain", ".htaccess")).toBe(false);
      expect(matchesAccept(".npmrc", "text/plain", ".npmrc")).toBe(false);
    });

    it("should handle complex file names", () => {
      expect(matchesAccept("my.file.name.with.dots.jpg", "image/jpeg", ".jpg")).toBe(true);
      expect(matchesAccept("version-1.0.0.tar.gz", "application/gzip", ".gz")).toBe(true);
    });
  });

  describe("real-world scenarios", () => {
    it("should validate image upload", () => {
      const imageAccept = "image/*";

      expect(matchesAccept("avatar.jpg", "image/jpeg", imageAccept)).toBe(true);
      expect(matchesAccept("logo.png", "image/png", imageAccept)).toBe(true);
      expect(matchesAccept("icon.svg", "image/svg+xml", imageAccept)).toBe(true);
      expect(matchesAccept("document.pdf", "application/pdf", imageAccept)).toBe(false);
    });

    it("should validate document upload", () => {
      const docAccept = ".pdf,.doc,.docx,.txt";

      expect(matchesAccept("resume.pdf", "application/pdf", docAccept)).toBe(true);
      expect(matchesAccept("letter.doc", "application/msword", docAccept)).toBe(true);
      expect(matchesAccept("notes.txt", "text/plain", docAccept)).toBe(true);
      expect(matchesAccept("photo.jpg", "image/jpeg", docAccept)).toBe(false);
    });

    it("should validate media files", () => {
      const mediaAccept = "image/*,video/*,audio/*";

      expect(matchesAccept("photo.jpg", "image/jpeg", mediaAccept)).toBe(true);
      expect(matchesAccept("clip.mp4", "video/mp4", mediaAccept)).toBe(true);
      expect(matchesAccept("song.mp3", "audio/mpeg", mediaAccept)).toBe(true);
      expect(matchesAccept("document.pdf", "application/pdf", mediaAccept)).toBe(false);
    });
  });
});
