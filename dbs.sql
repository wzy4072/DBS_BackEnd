/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : dbs

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 12/06/2020 15:48:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for b_buildings
-- ----------------------------
DROP TABLE IF EXISTS `b_buildings`;
CREATE TABLE `b_buildings`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键 楼栋id',
  `buildingName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `buildingDesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `buildingFloor` int(0) UNSIGNED NOT NULL,
  `everyFloorDoors` int(0) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_buildings
-- ----------------------------
INSERT INTO `b_buildings` VALUES (78, '88栋', '66号', 2, 3);
INSERT INTO `b_buildings` VALUES (79, '88栋', '66号', 2, 3);
INSERT INTO `b_buildings` VALUES (80, '88栋2', '66号', 2, 3);

-- ----------------------------
-- Table structure for b_charges
-- ----------------------------
DROP TABLE IF EXISTS `b_charges`;
CREATE TABLE `b_charges`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `buildingId` int(0) NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chargeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chargeAmount` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_charges
-- ----------------------------

-- ----------------------------
-- Table structure for b_rooms
-- ----------------------------
DROP TABLE IF EXISTS `b_rooms`;
CREATE TABLE `b_rooms`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '房间Id',
  `buildingId` int(0) NOT NULL COMMENT '所属楼栋',
  `roomName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '房间名',
  `roomFee` float NULL DEFAULT NULL,
  `waterPrice` float NULL DEFAULT NULL COMMENT '水价格',
  `electricityPrice` float NULL DEFAULT NULL COMMENT '电价格',
  `cleanFee` float NULL DEFAULT NULL COMMENT '卫生费',
  `netFee` float NULL DEFAULT NULL COMMENT '宽带费',
  `elseFee` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 103 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_rooms
-- ----------------------------
INSERT INTO `b_rooms` VALUES (349, 78, '101', 0, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (350, 78, '102', 0, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (351, 78, '103', 0, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (352, 78, '201', 0, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (353, 78, '202', 0, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (354, 78, '203', 0, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (355, 79, '101', 2000, 5.2, 1.5, 20.2, 20.3, 0);
INSERT INTO `b_rooms` VALUES (356, 79, '102', 3001, 5.2, 1.5, 20.2, 20.3, 0);
INSERT INTO `b_rooms` VALUES (357, 79, '103', 2000, 5.2, 1.5, 20.2, 20.3, 0);
INSERT INTO `b_rooms` VALUES (358, 79, '201', 2025, 5.2, 1.5, 20.2, 20.3, 0);
INSERT INTO `b_rooms` VALUES (359, 79, '202', 2000, 5.2, 1.5, 20.2, 20.3, 0);
INSERT INTO `b_rooms` VALUES (360, 79, '203', 2600, 5.2, 1.5, 20.2, 20.3, 0);
INSERT INTO `b_rooms` VALUES (361, 80, '101', 3000, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (362, 80, '102', 3000, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (363, 80, '103', 3000, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (364, 80, '201', 3000, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (365, 80, '202', 3000, 5, 1.5, 20, 0, 0);
INSERT INTO `b_rooms` VALUES (366, 80, '203', 3000, 5, 1.5, 20, 0, 0);

-- ----------------------------
-- Table structure for p_billamount
-- ----------------------------
DROP TABLE IF EXISTS `p_billamount`;
CREATE TABLE `p_billamount`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '月租项目明细',
  `buildingId` int(0) NULL DEFAULT NULL,
  `phaseId` int(0) NULL DEFAULT NULL,
  `roomId` int(0) NULL DEFAULT NULL,
  `roomName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `waterPrice` float(10, 2) NULL DEFAULT NULL,
  `electricityPrice` float(10, 2) NULL DEFAULT NULL,
  `cleanFee` float(10, 2) NULL DEFAULT NULL,
  `waterMeter` float(10, 0) NULL DEFAULT NULL,
  `electricityMeter` float(10, 0) NULL DEFAULT NULL,
  `lastwaterMeter` float(10, 0) NULL DEFAULT NULL,
  `lastelectricityMeter` float(10, 0) NULL DEFAULT NULL,
  `roomAmount` float(10, 2) NULL DEFAULT NULL,
  `elseFeesId` float NULL DEFAULT NULL,
  `roomFee` float NULL DEFAULT NULL,
  `netFee` float NULL DEFAULT NULL,
  `elseFee` float NULL DEFAULT NULL,
  `waterFees` float NULL DEFAULT NULL,
  `electricityFees` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_billamount
-- ----------------------------
INSERT INTO `p_billamount` VALUES (19, 80, 12, 361, '101', 5.00, 1.50, 20.00, 20, 22, 0, 0, 3153.00, NULL, 3000, 0, 0, 100, 33);
INSERT INTO `p_billamount` VALUES (20, 80, 12, 362, '102', 5.00, 1.50, 20.00, 45, 4, 0, 0, 3251.00, NULL, 3000, 0, 0, 225, 6);
INSERT INTO `p_billamount` VALUES (21, 80, 12, 363, '103', 5.00, 1.50, 20.00, 242, 156, 0, 0, 4464.00, NULL, 3000, 0, 0, 1210, 234);
INSERT INTO `p_billamount` VALUES (22, 80, 12, 364, '201', 5.00, 1.50, 20.00, 45, 62, 0, 0, 3338.00, NULL, 3000, 0, 0, 225, 93);
INSERT INTO `p_billamount` VALUES (23, 80, 12, 365, '202', 5.00, 1.50, 20.00, 52, 652, 0, 0, 4258.00, NULL, 3000, 0, 0, 260, 978);
INSERT INTO `p_billamount` VALUES (24, 80, 12, 366, '203', 5.00, 1.50, 20.00, 12, 52, 0, 0, 3158.00, NULL, 3000, 0, 0, 60, 78);

-- ----------------------------
-- Table structure for p_elsebill
-- ----------------------------
DROP TABLE IF EXISTS `p_elsebill`;
CREATE TABLE `p_elsebill`  (
  `id` int(0) NOT NULL,
  `phaseId` int(0) NOT NULL,
  `roomId` int(0) NOT NULL,
  `chargeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chargeAmount` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_elsebill
-- ----------------------------

-- ----------------------------
-- Table structure for p_meters
-- ----------------------------
DROP TABLE IF EXISTS `p_meters`;
CREATE TABLE `p_meters`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `phaseId` int(0) NOT NULL,
  `buildingId` int(0) NOT NULL,
  `waterMeter` float UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `electricityMeter` float UNSIGNED ZEROFILL NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_meters
-- ----------------------------
INSERT INTO `p_meters` VALUES (19, 12, 80, 000000000020, 000000000022);
INSERT INTO `p_meters` VALUES (20, 12, 80, 000000000045, 000000000004);
INSERT INTO `p_meters` VALUES (21, 12, 80, 000000000242, 000000000156);
INSERT INTO `p_meters` VALUES (22, 12, 80, 000000000045, 000000000062);
INSERT INTO `p_meters` VALUES (23, 12, 80, 000000000052, 000000000652);
INSERT INTO `p_meters` VALUES (24, 12, 80, 000000000012, 000000000052);

-- ----------------------------
-- Table structure for p_phases
-- ----------------------------
DROP TABLE IF EXISTS `p_phases`;
CREATE TABLE `p_phases`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `buildingId` int(0) NOT NULL,
  `phaseName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_phases
-- ----------------------------
INSERT INTO `p_phases` VALUES (9, 67, '666');
INSERT INTO `p_phases` VALUES (10, 67, '666');
INSERT INTO `p_phases` VALUES (12, 80, '20200606');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', 'admin123');

SET FOREIGN_KEY_CHECKS = 1;
