# 🧠 UTS_IFB309_2526_PEMROGRAMAN IOT

**Nama:** Muhammad Taufiq Rahman Hakim  
**NRP:** 152023119  

**SQL**
```bash
  CREATE TABLE `data_sensor` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `suhu` FLOAT NULL DEFAULT NULL,
    `humidity` FLOAT NULL DEFAULT NULL,
    `lux` FLOAT NULL DEFAULT NULL,
    `timestamp` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
  )
  COLLATE='utf8mb4_0900_ai_ci'
  ENGINE=InnoDB
  AUTO_INCREMENT=80;
```
