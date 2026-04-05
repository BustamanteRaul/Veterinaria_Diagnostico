-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 05, 2026 at 04:41 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Veterinaria`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing`
--

CREATE TABLE `billing` (
  `id_payment` int(7) NOT NULL,
  `visit_id` int(7) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` date NOT NULL,
  `paid` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billing`
--

INSERT INTO `billing` (`id_payment`, `visit_id`, `amount`, `payment_date`, `paid`) VALUES
(1, 1, 3500.00, '2024-01-08', 1),
(2, 2, 2800.00, '2024-01-15', 1),
(3, 3, 6200.00, '2024-01-22', 1),
(4, 4, 1500.00, '2024-02-03', 1),
(5, 5, 4000.00, '2024-02-10', 1),
(6, 6, 3200.00, '2024-02-18', 1),
(7, 7, 2500.00, '2024-02-25', 0),
(8, 8, 5800.00, '2024-03-04', 1),
(9, 9, 4100.00, '2024-03-11', 1),
(10, 10, 2700.00, '2024-03-18', 1),
(11, 11, 3500.00, '2024-03-25', 1),
(12, 12, 3000.00, '2024-04-01', 1),
(13, 13, 4500.00, '2024-04-08', 0),
(14, 14, 1800.00, '2024-04-15', 1),
(15, 15, 3500.00, '2024-04-22', 1),
(16, 16, 2000.00, '2024-04-29', 1),
(17, 17, 2900.00, '2024-05-06', 1),
(18, 18, 3100.00, '2024-05-13', 0),
(19, 19, 5500.00, '2024-05-20', 1),
(20, 20, 1500.00, '2024-05-27', 1),
(21, 21, 2600.00, '2024-06-03', 1),
(22, 22, 3000.00, '2024-06-10', 1),
(23, 23, 4800.00, '2024-06-17', 0),
(24, 24, 5200.00, '2024-06-24', 1),
(25, 25, 3300.00, '2024-07-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `id_owner` int(4) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `creation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`id_owner`, `name`, `phone`, `creation_date`) VALUES
(1, 'Carlos Méndez', '+54 11 4523 7890', '2023-01-10'),
(2, 'Laura Gómez', '+54 11 3812 4567', '2023-02-14'),
(3, 'Martín Torres', '+54 11 5034 2198', '2023-03-05'),
(4, 'Sofía Ramírez', '+54 11 4761 8832', '2023-03-22'),
(5, 'Diego Fernández', '+54 11 6023 1145', '2023-04-11'),
(6, 'Valentina López', '+54 11 4890 3367', '2023-05-03'),
(7, 'Andrés Castillo', '+54 11 5512 9900', '2023-05-19'),
(8, 'Camila Herrera', '+54 11 4234 6678', '2023-06-08'),
(9, 'Lucas Moreno', '+54 11 6341 2289', '2023-06-27'),
(10, 'Florencia Ruiz', '+54 11 4978 5541', '2023-07-15'),
(11, 'Nicolás Vargas', '+54 11 5123 4477', '2023-08-02'),
(12, 'Julieta Sosa', '+54 11 4657 8823', '2023-08-20'),
(13, 'Rodrigo Acosta', '+54 11 6789 0034', '2023-09-10'),
(14, 'Micaela Blanco', '+54 11 4312 6690', '2023-10-01'),
(15, 'Tomás Ibáñez', '+54 11 5901 3312', '2023-10-18');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id_pet` int(5) NOT NULL,
  `owner_id` int(4) NOT NULL,
  `name` varchar(20) NOT NULL,
  `species` varchar(20) NOT NULL,
  `breed` varchar(20) NOT NULL,
  `sex` tinyint(4) NOT NULL,
  `birth_date` date NOT NULL,
  `weight` decimal(7,2) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id_pet`, `owner_id`, `name`, `species`, `breed`, `sex`, `birth_date`, `weight`, `notes`) VALUES
(1, 1, 'Rocky', 'Dog', 'Labrador', 1, '2019-04-12', 28.50, 'Allergic to chicken. Needs omega-3 supplement.'),
(2, 1, 'Mia', 'Cat', 'Persian', 0, '2020-07-03', 4.20, 'Indoor only. Sensitive stomach.'),
(3, 2, 'Luna', 'Dog', 'Golden Retriever', 0, '2018-11-20', 31.00, 'Hip dysplasia follow-up required.'),
(4, 3, 'Simba', 'Cat', 'Siamese', 1, '2021-02-14', 5.10, 'Outdoor cat. Up to date on vaccines.'),
(5, 4, 'Bella', 'Dog', 'Poodle', 0, '2022-06-01', 8.75, 'Recently adopted. First vet visit.'),
(6, 5, 'Thor', 'Dog', 'German Shepherd', 1, '2017-09-30', 34.20, 'Arthritis in left hind leg.'),
(7, 5, 'Nala', 'Cat', 'Maine Coon', 0, '2020-03-18', 6.80, 'Tends to overeat. Diet food recommended.'),
(8, 6, 'Max', 'Dog', 'Bulldog', 1, '2019-12-05', 22.40, 'Breathing issues. Brachycephalic.'),
(9, 7, 'Cleo', 'Cat', 'Domestic', 0, '2021-08-22', 3.90, 'Rescued. Mild anemia on last check.'),
(10, 8, 'Toby', 'Dog', 'Beagle', 1, '2020-05-10', 13.60, 'Loves to eat. Weight management needed.'),
(11, 9, 'Kira', 'Dog', 'Border Collie', 0, '2018-07-14', 19.30, 'Very active. Regular deworming.'),
(12, 9, 'Milo', 'Rabbit', 'Holland Lop', 1, '2022-01-09', 1.80, 'Dental checkup every 6 months.'),
(13, 10, 'Lola', 'Dog', 'Dachshund', 0, '2021-10-27', 9.10, 'Back problems. Avoid stairs.'),
(14, 11, 'Coco', 'Bird', 'Cockatiel', 1, '2020-04-15', 0.09, 'Wing feathers trimmed annually.'),
(15, 12, 'Bruno', 'Dog', 'Rottweiler', 1, '2019-03-08', 42.00, 'Guard dog. Calm temperament.'),
(16, 12, 'Pipa', 'Cat', 'Ragdoll', 0, '2022-09-14', 5.60, 'Loves cuddles. No health issues.'),
(17, 13, 'Gato', 'Cat', 'Domestic', 1, '2018-06-30', 4.70, 'Hyperthyroidism. Daily medication.'),
(18, 14, 'Duna', 'Dog', 'Husky', 0, '2020-08-19', 23.80, 'Needs cold environment. Shedding season April.'),
(19, 14, 'Zeus', 'Dog', 'Dobermann', 1, '2021-11-03', 36.50, 'Heart murmur detected. Cardiology follow-up.'),
(20, 15, 'Nina', 'Dog', 'Maltese', 0, '2023-01-25', 3.20, 'Puppy. All vaccines in progress.');

-- --------------------------------------------------------

--
-- Table structure for table `visit`
--

CREATE TABLE `visit` (
  `id_visit` int(7) NOT NULL,
  `pet_id` int(5) NOT NULL,
  `visit_date` date NOT NULL,
  `reason` varchar(100) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visit`
--

INSERT INTO `visit` (`id_visit`, `pet_id`, `visit_date`, `reason`, `notes`) VALUES
(1, 1, '2024-01-08', 'Annual checkup', 'General health good. Vaccine booster applied.'),
(2, 2, '2024-01-15', 'Digestive issue', 'Prescribed bland diet for 5 days. Probiotic added.'),
(3, 3, '2024-01-22', 'Hip follow-up', 'X-ray taken. Moderate dysplasia. Anti-inflammatory prescribed.'),
(4, 4, '2024-02-03', 'Vaccine update', 'Rabies and triple vaccine applied.'),
(5, 5, '2024-02-10', 'First visit', 'Full physical exam. Deworming applied. Healthy puppy.'),
(6, 6, '2024-02-18', 'Arthritis checkup', 'Pain management adjusted. Mobility slightly improved.'),
(7, 7, '2024-02-25', 'Weight control', 'Weight up to 7.4kg. Reduced food portions advised.'),
(8, 8, '2024-03-04', 'Breathing difficulty', 'Oxygen saturation 94%. Referral to specialist.'),
(9, 9, '2024-03-11', 'Blood test', 'Hemoglobin low. Iron supplement prescribed.'),
(10, 10, '2024-03-18', 'Weight management', 'Weight stable at 13.6kg. Continued diet food.'),
(11, 11, '2024-03-25', 'Annual checkup', 'Excellent health. Very active. No issues found.'),
(12, 12, '2024-04-01', 'Dental checkup', 'Slight overgrowth on incisors. Filed down.'),
(13, 13, '2024-04-08', 'Back pain', 'Spinal compression noted. Rest and NSAIDs prescribed.'),
(14, 14, '2024-04-15', 'Feather trim', 'Wing feathers trimmed. Beak in good condition.'),
(15, 15, '2024-04-22', 'Annual checkup', 'All good. Weight ideal. Vaccine booster applied.'),
(16, 16, '2024-04-29', 'Routine checkup', 'Healthy. No issues. Owner advised on diet.'),
(17, 17, '2024-05-06', 'Thyroid followup', 'T4 levels stable. Medication dose maintained.'),
(18, 18, '2024-05-13', 'Shedding & skin', 'Mild dermatitis. Medicated shampoo prescribed.'),
(19, 19, '2024-05-20', 'Cardiology followup', 'Murmur unchanged. ECG normal. Vet satisfied.'),
(20, 20, '2024-05-27', 'Vaccine - 2nd dose', 'Second puppy vaccine applied. Healthy and active.'),
(21, 1, '2024-06-03', 'Allergy flare-up', 'Skin reaction. Antihistamine prescribed.'),
(22, 3, '2024-06-10', 'Post-treatment check', 'Hip inflammation reduced. Positive progress.'),
(23, 6, '2024-06-17', 'Arthritis - urgent', 'Acute pain episode. Stronger pain relief prescribed.'),
(24, 10, '2024-06-24', 'Dental cleaning', 'Tartar removed under light sedation.'),
(25, 13, '2024-07-01', 'Back follow-up', 'Improvement noted. Physical therapy recommended.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billing`
--
ALTER TABLE `billing`
  ADD PRIMARY KEY (`id_payment`),
  ADD KEY `billing_ibfk_1` (`visit_id`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`id_owner`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id_pet`),
  ADD KEY `pets_ibfk_1` (`owner_id`);

--
-- Indexes for table `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`id_visit`),
  ADD KEY `visit_ibfk_1` (`pet_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billing`
--
ALTER TABLE `billing`
  MODIFY `id_payment` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `owner`
--
ALTER TABLE `owner`
  MODIFY `id_owner` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id_pet` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `visit`
--
ALTER TABLE `visit`
  MODIFY `id_visit` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `billing`
--
ALTER TABLE `billing`
  ADD CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id_visit`) ON DELETE CASCADE;

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `owner` (`id_owner`) ON DELETE CASCADE;

--
-- Constraints for table `visit`
--
ALTER TABLE `visit`
  ADD CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id_pet`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
