-- Create a new database called 'RGBay'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF EXISTS (
    SELECT [name]
    FROM sys.databases
    WHERE [name] = N'RGBAY'
)
ALTER DATABASE [RGBay] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
USE master
DROP DATABASE [RGBay]
GO

IF NOT EXISTS (
SELECT [name]
FROM sys.databases
WHERE [name] = N'RGBay'
)
CREATE DATABASE RGBay
GO

USE RGBay
-- Create a new table called '[User]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[User]', 'U') IS NOT NULL

DROP TABLE [dbo].[User]
GO

CREATE TABLE [dbo].[User]
(
	[Id] int identity(1,1) not null primary key,
	[FirebaseUid] nvarchar(50) not null,
	[Username] nvarchar(50) not null,
	[Email] nvarchar(320) not null,
	[City] nvarchar (50) not null,
	[State] nvarchar (50) not null,
	[Bio] nvarchar (1200) null, 
	[IsDeleted] bit not null default (0)
)

GO

-- Insert rows into table 'User' in schema '[dbo]'
INSERT INTO [dbo].[User]
( -- Columns to insert data into
 [FirebaseUid], [Username], [Email], [City], [State], [Bio]
)
VALUES
( -- First row: values for the columns in the list above
'000000000000000001', 'rOCKsTEADY', 'steadyrockin@underwhelms.com', 'Nashville', 'TN', 'This is my bio 1'
),
( -- Second row: values for the columns in the list above
 '000000000000000002', 'BeeBop', 'beeboppin@underwhelms.com', 'Chattanooga', 'TN', 'This is my bio 2'
),
( -- Third row: values for the columns in the list above
 '000000000000000003', 'JankyPromo', 'screechin@cowmilk.com', 'Nashville', 'TN', 'This is my bio 3'
),
( -- Fourth row: values for the columns in the list above
 '000000000000000004', 'iLLGates', 'smokingsauasge@coolkids.com', 'Memphis', 'TN', 'This is my bio 4'
),
(
 'ssCIfSjBSsXYaOpFeqxNTnYMhfG3', 'STrejo', 'trejomsamuel@gmail.com', 'Nashville', 'TN', 'I like space!'
)
GO

-- Create a new table called '[PaymentType]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[PaymentType]', 'U') IS NOT NULL
DROP TABLE [dbo].[PaymentType]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[PaymentType]
(
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Primary Key column
    [UserId] INT NOT NULL
        FOREIGN KEY (UserId)
        REFERENCES [User] (Id),
    [ServiceName] INT NOT NULL,
    [ProfileName] NVARCHAR(50) NOT NULL,
	[IsDeleted] bit not null default (0)
);
GO

-- Insert rows into table 'PaymentType' in schema '[dbo]'
INSERT INTO [dbo].[PaymentType]
( -- Columns to insert data into
 [UserId], [ServiceName], [ProfileName]
)
VALUES
( -- First row: values for the columns in the list above
 1, 1, '@1Cool4School'
),
( -- Second row: values for the columns in the list above
 2, 2, '@2Cool4School'
),
( -- Third row: values for the columns in the list above
 3, 3, '@3Cool4School'
),
( -- Fourth row: values for the columns in the list above
 4, 4, '@4Cool4School'
)
GO

-- Create a new table called '[ProductCategory]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[ProductCategory]', 'U') IS NOT NULL
DROP TABLE [dbo].[ProductCategory]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[ProductCategory]
(
    [Id] int identity(1,1) not null primary key,
    [Name] NVARCHAR(50) NOT NULL,
	[IsDeleted] bit not null default (0)
);
GO

-- Insert rows into table 'ProductCategory' in schema '[dbo]'
INSERT INTO [dbo].[ProductCategory]
    ( -- Columns to insert data into
    [Name]
    )
VALUES
    (
        'Part'
),
    (
        'Peripheral'
),
    (
        'Space'
),
    (
        'System'
)
-- Add more rows here
GO

-- Create a new table called '[Product]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[Product]', 'U') IS NOT NULL
DROP TABLE [dbo].[Product]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[Product]
(
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Primary Key column
    [Title] NVARCHAR(255) NOT NULL,
	[Category] INT NOT NULL
        FOREIGN KEY (Category)
        REFERENCES [ProductCategory] (Id),
	[RentalPrice] INT NOT NULL,
	[SalesPrice] INT NOT NULL,
	[IsRgb] BIT NOT NULL,
	[Description] NVARCHAR(1000) NOT NULL,
	[ImageUrl] NVARCHAR(1000) NOT NULL,
	[DateCreated] DATETIME2 NOT NULL DEFAULT GETDATE(),
	[OwnerId] INT NOT NULL
        FOREIGN KEY (OwnerId)
        REFERENCES [User] (Id),
	[IsDeleted] bit not null default (0)
);
GO

-- Insert rows into table 'Product' in schema '[dbo]'
INSERT INTO [dbo].[Product]
([Title], [Category], [RentalPrice], [SalesPrice], [IsRgb], [Description], [DateCreated], [OwnerId], [ImageUrl])
VALUES --categories part 1, peripheral 2, space 3, system 4
('Corsair Nightsword RGB Mouse', 2, '750', '4500', 1, 'With 10 programmable buttons, RGB lighting, and a native 18kDPI sensor, this mouse is sure to up your game', dateadd(day,-1, getdate()), 2, 'https://m.media-amazon.com/images/I/613J82iVB1L._AC_UL320_ML3_.jpg'),
('Corsair Vengeance RGB Pro RAM (2x8GB DDR4)', 1, '0', '8000', 1, 'New-in-box 16GB kit of DDR4 RGB memory from Corsair. Full iCUE sync support for your blinged out rig', dateadd(day,-2, getdate()), 2, 'https://m.media-amazon.com/images/I/91B-Tqxo+PL._AC_UL320_ML3_.jpg'),
('Corsair HS60 7.1 Surround Sound Headset (Gently Used)', 2, '0', '7500', 0, 'Gently used Corsair headeset with virtual 7.1 surround sound support. Compatible with PC, XBOne, PS4, and Switch. Upgraded to something with RGB', dateadd(day,-3, getdate()), 2, 'https://m.media-amazon.com/images/I/61vR61h9KdL._AC_UL320_ML3_.jpg'),
('Corsair K70 RGB MK.2 Keyboard with Cherry MX Red switches', 2, '1000', '7500', 1, 'Aluminum frame keyboard with genuine Cherry MX Red switches, fully addressable RGB, 104 key rollover and 1000Hz report rate. Corsair iCUE compatible', dateadd(day,-4, getdate()), 2, 'https://m.media-amazon.com/images/I/71eARwGvFaL._AC_UL320_ML3_.jpg'),
('Corsair H100i RGB Platinum AIO CPU Cooler', 1, '0', '12500', 1, 'Like-new 2x120mm AIO cooler with full RGB. Keeps your CPU frosty like Ramirez. Upgraded to a custom loop and no longer have a use for it. $125 OBO', dateadd(day,-5, getdate()), 2, 'https://m.media-amazon.com/images/I/51WqefOWisL._AC_UY218_ML3_.jpg'),
('Corsair ST100 RGB Headset Stand, Amp/DAC, and USB Hub', 2, '825', '5000', 1, 'Wow your friends with this absolutely ludicrous invention. 9-zone RGB lighting accents this ALUMINUM headset stand so you can rainbow-out listening to virtual 7.1 surround sound through the integrated DAC with 3.5mm output. Also includes 2x USB3.0 ports for Mouse & Keyboard or whatever dope gamer gear you need to plug in', dateadd(day,-6, getdate()), 2, 'https://m.media-amazon.com/images/I/51lh-DEa5NL._AC_UY218_ML3_.jpg'),
('Logitech G512 SE Keyboard', 2, '500', '5000', 1, 'RGB Keyboard with USB Pasthrough and Romer-G Tactile switches', dateadd(day,-7, getdate()), 1, 'https://m.media-amazon.com/images/I/71goKxqBHnL._AC_UY218_ML3_.jpg'),
('Logitech HD Webcam C615', 2, '300', '2000', 0, 'Perfectly acceptable webcam. Easy to use and records 1080p. Not RGB, but we cant have it all', dateadd(day,-8, getdate()), 1, 'https://m.media-amazon.com/images/I/91SNDNgjSiL._AC_UL320_ML3_.jpg'),
('Logitech G203 Prodigy RGB Mouse', 2, '250', '1500', 1, '6k DPI sensor with 6 customizable buttons makes for a tolerable gaming experience. At least it has RGB', dateadd(day,-9, getdate()), 1, 'https://m.media-amazon.com/images/I/71BmDZ6u22L._AC_UL320_ML3_.jpg'),
('Logitech G920 Racing Wheel + Pedals', 2, '2250', '0', 0, 'Rental only. Hop in to simracing and feel the action with this dual-motor force feedback wheel! Compatible with XBone or PC', dateadd(day,-10, getdate()), 1, 'https://m.media-amazon.com/images/I/51KQqdl5azL._AC_UY218_ML3_.jpg'),
('Alienware M15 Laptop with 4.1GHz i7 & GTX 1660Ti', 4, '8000', '87598', 0, 'Beast of a gaming laptop, solid 90FPS locked in all AAA titles. Games not included', dateadd(day,-11, getdate()), 1, 'https://m.media-amazon.com/images/I/71J7q3UpQnL._AC_UL320_ML3_.jpg'),
('Alienware 25" 1080p 240Hz FreeSync Gaming Monitor', 2, '0', '25000', 0, 'Perfect monitor for ESports! Blazing fast refresh rate, 1ms response time, and FreeSync for a tear-free experience. Less than a year old! Upgraded to an ultrawide and need the money', dateadd(day,-12, getdate()), 1, 'https://m.media-amazon.com/images/I/71l+Z8gJMIL._AC_UL320_ML3_.jpg'),
('Alienware Aurora R9 i7 9700, 16GB RAM, RTX 2070 OC 8GB', 4, '12000', '125000', 1, 'This rig is bananas. It can handle 4k, VR, literally anything you throw at it... Please dont actually throw anything at it', dateadd(day,-13, getdate()), 1, 'https://m.media-amazon.com/images/I/71Bu3+vAWGL._AC_UY218_ML3_.jpg'),
('NVIDIA RTX 2080 Super', 1, '0', '57500', 0, 'Old news. Upgraded to an RTX 2080 Ti. Mom said I had to sell it', dateadd(day,-14, getdate()), 1, 'https://m.media-amazon.com/images/I/61VkiYYGMhL._AC_UY218_ML3_.jpg'),
('EVGA RTX 2070 XC Gaming', 1, '0', '45000', 0, 'Perfect for streamers or 1440p gaming', dateadd(day,-15, getdate()), 1, 'https://m.media-amazon.com/images/I/71WA8Pm9AoL._AC_UY218_ML3_.jpg'),
('NVIDIA Shield', 4, '3000', '0', 0, 'Experience cloud gaming or in-home streaming with this rad NVIDIA SHIELD', dateadd(day,-16, getdate()), 1, 'https://m.media-amazon.com/images/I/61BbVbSSNuL._AC_UY218_ML3_.jpg'),
('Intel Core i7-9700K OCTAcore 4.9GHz Boost', 1, '0', '30000', 0, 'Dummy-fast CPU from my editing rig. Switched to AMD because core count', dateadd(day,-17, getdate()), 1, 'https://m.media-amazon.com/images/I/71Q5sdPHD-L._AC_UL320_ML3_.jpg'),
('Intel Core i5-9600K Six-Core 3.7GHz Boost', 1, '0', '17500', 0, 'Perfect for streaming, 4 cores for gaming and 2 for encoding!', dateadd(day,-18, getdate()), 1, 'https://m.media-amazon.com/images/I/71709S6VMTL._AC_UL320_ML3_.jpg'),
('Intel Core i9-9900K', 1, '0', '50000', 0, 'Brand new. If you know, you know', dateadd(day,-19, getdate()), 1, 'https://m.media-amazon.com/images/I/71Tor75VsGL._AC_UL320_ML3_.jpg'),
('Samsung 860 EVO 500GB SSD', 1, '0', '50000', 0, 'Lightly used Samsung 860 Evo. Just used for gaming, not heavy read/write', dateadd(day,-20, getdate()), 1, 'https://m.media-amazon.com/images/I/914Zq+CIeML._AC_UL320_ML3_.jpg'),
('Samsung 65" 4K QLED Smart TV', 2, '17500', '150000', 0, 'Massive 4K TV with velvety blacks and blinding whites', dateadd(day,-21, getdate()), 1, 'https://m.media-amazon.com/images/I/91rhYwnuu7L._AC_UY218_ML3_.jpg'),
('Samsung Chromebook Plus V2', 4, '3000', '30000', 0, 'Great for homework or shoutcasting at your next ESports event. Battery life is absolutely killer', dateadd(day,-22, getdate()), 1, 'https://m.media-amazon.com/images/I/81mX-4s+guL._AC_UY218_ML3_.jpg'),
('Oculus Rift S', 2, '3500', '35000', 0, 'Great HMD with inside-out tracking. Setup is a breeze!', dateadd(day,-23, getdate()), 1, 'https://m.media-amazon.com/images/I/71URNvzoWqL._AC_UY218_ML3_.jpg'),
('Oculus Go', 2, '0', '15000', 0, 'Take your VR games with you on the go!', dateadd(day,-24, getdate()), 3, 'https://m.media-amazon.com/images/I/610iXon9LfL._AC_UY218_ML3_.jpg'),
('Oculus Quest', 2, '0', '37500', 0, 'Latest and greatest VR experience. Hope you have a powerful rig!', dateadd(day,-25, getdate()), 2, 'https://m.media-amazon.com/images/I/71D9OsZmWxL._AC_UY218_ML3_.jpg'),
('Gaming Getaway', 3, '25000', '0', 1, 'Perfect choice to relax and unwind. Consoles, PC, OLED, and Projector; mix and match as you see fit', dateadd(day,-26, getdate()), 2, 'https://i.pinimg.com/originals/2a/c1/ac/2ac1ac7a558efbc6d61bae7505677074.jpg'),
('Fragging and Fret Boards', 3, '25000', '0', 1, 'Produce and PWN all in the same space! Spice up your next co-writing session with some co-op', dateadd(day,-27, getdate()), 2, 'https://i.pinimg.com/originals/9c/a1/b3/9ca1b3268e82a9237a6d94cf510ecb7a.jpg'),
('Gargantuan Gaming Grotto', 3, '45000', '0', 1, 'Two words: Sensory. Overload.', dateadd(day,-28, getdate()), 2, 'http://www.creativetouchs.net/wp-content/uploads/2019/02/Best-Game-Room-Decoration-Ideas.jpg'),
('The War Room', 3, '37500', '0', 1, 'The ultimate streaming station. With more screen real estate than is honestly even usable, this setup is perfect for organizing and casting entire ESports events, day trading, or watching races to world-firsts', dateadd(day,-29, getdate()), 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT27zVTnkcryexhZ1_5waP3jYLaXPj7mumlea9-JknUIS5szQLl&s')
GO


IF OBJECT_ID('[dbo].[Order]', 'U') IS NOT NULL
DROP TABLE [dbo].[Order]
GO
CREATE TABLE [dbo].[Order]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [CustomerId] INT
        FOREIGN KEY
        REFERENCES [User] (Id),
    [Date] DATETIME,
    [Total] INT NOT NULL,
    [Status] NVARCHAR(50),
	[IsDeleted] bit not null default (0)
);
GO

INSERT INTO [dbo].[Order]
(
    [CustomerId], [Date], [Total], [Status]
)
VALUES
-- DATETIME FORMAT = YYYYMMDD HH:MM:SS AM/PM
(
    1, '20001231 11:59:59 PM', 1000, 'Proccessing'
),
(
    2, '20120710 12:00:00 PM', 2000, 'Delivered'
),
(
    3, '20180418 07:11:30 AM', 3000, 'Shipped'
),
(
    4, '20191120 6:00:00 AM', 4000, 'Cart'
)
GO


    ------------------------------------------------------------
IF OBJECT_ID('[dbo].[OrderProduct]', 'U') IS NOT NULL
DROP TABLE [dbo].[OrderProduct]
GO
    ------------------------------------------------------------

CREATE TABLE [dbo].[OrderProduct]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- Primary Key column
    [OrderId] INT NOT NULL
        FOREIGN KEY
        REFERENCES [Order] (Id),
    [ProductId] INT NOT NULL
        FOREIGN KEY
        REFERENCES [Product] (Id),
    [Duration] INT,
	[IsDeleted] bit not null default (0)
);
GO

INSERT INTO [dbo].[OrderProduct]
(
    [OrderId], [ProductId], [Duration]
)
VALUES
(
    1, 4, 7
),
(
    1, 3, 14
),
(
    2, 1, 4
),
(
    2, 2, 6
),
(
    3, 1, 8
),
(
    3, 4, 10
),
(
    4, 1, 12
),
(
    4, 2, 15
),
(
    4, 3, 15
),
(
    4, 4, 15
)
GO