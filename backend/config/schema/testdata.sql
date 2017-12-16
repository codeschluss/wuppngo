SET character_set_client = utf8;

INSERT INTO `configurations` (`id`, `item`, `value`) VALUES
('00000000-0000-0000-0001-000000000001', 'mapcenterLongitude', '7.1756'),
('00000000-0000-0000-0001-000000000002', 'mapcenterLatitude', '51.2640'),
('00000000-0000-0000-0001-000000000003', 'zoomfactor', '13.5'),
('00000000-0000-0000-0001-000000000004', 'mapProjection', 'EPSG:4326'),
('00000000-0000-0000-0001-000000000005', 'portalName', 'Wupportal'),
('00000000-0000-0000-0001-000000000006', 'portalSubtitle', 'Integrationsportal');

INSERT INTO `tags` (`id`, `name`, `description`) VALUES
('00000000-0000-0000-0002-000000000001', 'sport', 'Sportaktivität'),
('00000000-0000-0000-0002-000000000002', 'sprache', 'Sprachkurs'),
('00000000-0000-0000-0002-000000000003', 'jung', 'Für junge Leute'),
('00000000-0000-0000-0002-000000000004', 'alt', 'Für alte Leute'),
('00000000-0000-0000-0002-000000000005', 'lernen', 'Lernen'),
('00000000-0000-0000-0002-000000000006', 'jungundalt', 'jungundalt');

INSERT INTO `target_groups` (`id`, `name`, `description`) VALUES
('00000000-0000-0000-0003-000000000001', 'Erwachsene', 'Adult target group'),
('00000000-0000-0000-0003-000000000002', 'Kinder', 'Kid target group');

INSERT INTO `users` (`id`, `superuser`, `username`, `password`, `fullname`, `phone`) VALUES
('00000000-0000-0000-0004-000000000001', 1, 'john@doe.com', 'password', 'John Doe\'s', '01234567890'),
('00000000-0000-0000-0004-000000000002', 0, 'max@mustermann.de', 'password', 'Max Mustermann', '09876543210'),
('e122098e-a2a1-4bce-b7d7-b08536dc2cef', 1, 'test@domain.de', '$2y$10$kA.4ijt9zkkfsfi6dRJc9eB6Ro.Q6SAR.CWsUou7QCq3htKfmcWoy', 'Tester', NULL);

INSERT INTO `suburbs` (`id`, `name`) VALUES
('00000000-0000-0000-0005-000000000001', 'Elberfeld'),
('00000000-0000-0000-0005-000000000002', 'Barmen');

INSERT INTO `addresses` (`id`, `longitude`, `latitude`, `street`, `house_number`, `postal_code`, `place`, `suburb_id`) VALUES
('00000000-0000-0000-0006-000000000001', 7.14733123779296900000, 51.25588989257812500000, 'Döppersberg', '19', '42103', 'wuppertal', '00000000-0000-0000-0005-000000000001'),
('00000000-0000-0000-0006-000000000002', 7.2, 51.25505828857422000000, 'Gathe', '6', '42103', 'wuppertal', '00000000-0000-0000-0005-000000000001');

INSERT INTO `categories` (`id`, `name`, `description`, `color`) VALUES
('00000000-0000-0000-0007-000000000001', 'Sportaktivität', 'Sportliche Aktivitäten', 'blau'),
('00000000-0000-0000-0007-000000000002', 'Sprachkurs', 'Sprachkurse', 'rot');

INSERT INTO `organisations` (`id`, `name`, `description`, `website`, `mail`, `phone`, `image`, `address_id`) VALUES
('00000000-0000-0000-0008-000000000001', 'Muster Organisation', 'Wir bieten Sportaktivitäten an', 'www.domain.de', 'muster@organisation.de', '01234567890', null, '00000000-0000-0000-0006-000000000001'),
('00000000-0000-0000-0008-000000000002', 'Doe\'s Organisation', 'Wir bieten Sprachkurse an', 'www.does-organisation.com', 'does@doe.com', '09876543210', null, '00000000-0000-0000-0006-000000000002'),
('00000000-0000-0000-0008-000000000003', 'Moe\'s Organisation', 'Wir bieten Braukurse an', 'www.moes-organisation.com', 'moes@organisation.com', '09876543210', null, '00000000-0000-0000-0006-000000000002');

INSERT INTO `providers` (`id`, `organisation_id`, `user_id`, `admin`, `approved`) VALUES
('00000000-0000-0000-0009-000000000001', '00000000-0000-0000-0008-000000000002', '00000000-0000-0000-0004-000000000001', 0, 0),
('00000000-0000-0000-0009-000000000002', '00000000-0000-0000-0008-000000000001', '00000000-0000-0000-0004-000000000002', 1, 1),
('00000000-0000-0000-0009-000000000003', '00000000-0000-0000-0008-000000000001', 'e122098e-a2a1-4bce-b7d7-b08536dc2cef', 1, 1),
('00000000-0000-0000-0009-000000000004', '00000000-0000-0000-0008-000000000002', 'e122098e-a2a1-4bce-b7d7-b08536dc2cef', 1, 1);

INSERT INTO `activities` (`id`, `name`, `description`, `show_user`, `address_id`, `provider_id`, `category_id`) VALUES
('00000000-0000-0000-000a-000000000001', 'Sprachkurs', 'Englisch Sprachkurs für Jung und Alt', 1, '00000000-0000-0000-0006-000000000001', '00000000-0000-0000-0009-000000000001', '00000000-0000-0000-0007-000000000002'),
('00000000-0000-0000-000a-000000000002', 'Sportaktivität', 'Sportaktivität für Jung und Alt', 0, '00000000-0000-0000-0006-000000000001', '00000000-0000-0000-0009-000000000002', '00000000-0000-0000-0007-000000000002'),
('00000000-0000-0000-000a-000000000003', 'Sprachkurs', 'Deutsch Sprachkurs für Alt und Jung', 1, '00000000-0000-0000-0006-000000000002', '00000000-0000-0000-0009-000000000003', '00000000-0000-0000-0007-000000000002'),
('00000000-0000-0000-000a-000000000004', 'Sprachkurs', 'Englisch', 1, '00000000-0000-0000-0006-000000000002', '00000000-0000-0000-0009-000000000003', '00000000-0000-0000-0007-000000000002');

INSERT INTO `schedules` (`id`, `start_date`, `end_date`, `activity_id`) VALUES
('00000000-0000-0000-000s-000000000001', '2017-11-08 12:00:00', '2017-11-08 12:30:00', '00000000-0000-0000-000a-000000000001'),
('00000000-0000-0000-000s-000000000002', '2017-12-31 18:00:00', '2017-12-31 18:30:00', '00000000-0000-0000-000a-000000000002'),
('00000000-0000-0000-000s-000000000003', '2018-01-24 12:30:00', '2018-01-24 15:30:00', '00000000-0000-0000-000a-000000000002'),
('00000000-0000-0000-000s-000000000004', '2017-03-08 18:00:00', '2017-03-08 20:30:00', '00000000-0000-0000-000a-000000000003'),
('00000000-0000-0000-000s-000000000005', '2017-12-08 12:00:00', '2017-12-08 12:30:00', '00000000-0000-0000-000a-000000000002'),
('00000000-0000-0000-000s-000000000006', '2017-03-08 18:00:00', '2017-03-08 20:30:00', '00000000-0000-0000-000a-000000000002');

INSERT INTO `activities_tags` (`id`, `tag_id`, `activity_id`) VALUES
('00000000-0000-0000-000b-000000000001', '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-000a-000000000002'),
('00000000-0000-0000-000b-000000000002', '00000000-0000-0000-0002-000000000002', '00000000-0000-0000-000a-000000000001'),
('00000000-0000-0000-000b-000000000003', '00000000-0000-0000-0002-000000000003', '00000000-0000-0000-000a-000000000001'),
('00000000-0000-0000-000b-000000000004', '00000000-0000-0000-0002-000000000004', '00000000-0000-0000-000a-000000000001'),
('00000000-0000-0000-000b-000000000005', '00000000-0000-0000-0002-000000000005', '00000000-0000-0000-000a-000000000001'),
('00000000-0000-0000-000b-000000000006', '00000000-0000-0000-0002-000000000006', '00000000-0000-0000-000a-000000000001'),
('00000000-0000-0000-000b-000000000010', '00000000-0000-0000-0002-000000000003', '00000000-0000-0000-000a-000000000003'),
('00000000-0000-0000-000b-000000000011', '00000000-0000-0000-0002-000000000004', '00000000-0000-0000-000a-000000000003'),
('00000000-0000-0000-000b-000000000012', '00000000-0000-0000-0002-000000000005', '00000000-0000-0000-000a-000000000003'),
('00000000-0000-0000-000b-000000000013', '00000000-0000-0000-0002-000000000006', '00000000-0000-0000-000a-000000000003'),
('00000000-0000-0000-000b-000000000016', '00000000-0000-0000-0002-000000000002', '00000000-0000-0000-000a-000000000004');

INSERT INTO `activities_target_groups` (`id`, `target_group_id`, `activity_id`) VALUES
('00000000-0000-0000-000c-000000000001', '00000000-0000-0000-0003-000000000002', '00000000-0000-0000-000a-000000000002'),
('00000000-0000-0000-000c-000000000002', '00000000-0000-0000-0003-000000000001', '00000000-0000-0000-000a-000000000002'),
('00000000-0000-0000-000c-000000000003', '00000000-0000-0000-0003-000000000002', '00000000-0000-0000-000a-000000000001'),
('00000000-0000-0000-000c-000000000004', '00000000-0000-0000-0003-000000000001', '00000000-0000-0000-000a-000000000001');

commit;
