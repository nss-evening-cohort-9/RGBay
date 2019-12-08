-- Create a new database called 'RGBay'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
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
	[Bio] nvarchar (1200) null
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
 'PkhVyqmQLTgObjj6znZ1aT226zf2', 'STrejo', 'trejomsamuel@gmail.com', 'Nashville', 'TN', 'I like space!'
),
(
 '000000000000000005', 'SBrown', 'smokingsauasge@coolkids.com', 'Memphis', 'TN', 'This is my bio 4'
),
(
 '000000000000000006', 'KGates', 'smokingsauasge@coolkids.com', 'Memphis', 'TN', 'This is my bio 4'
),
(
 '000000000000000007', 'ATiller', ' tiller.andrew@gmail.com', 'Memphis', 'TN', 'This is my bio 4'
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
    [ProfileName] NVARCHAR(50) NOT NULL
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
    -- Primary Key column
    [Name] NVARCHAR(50) NOT NULL
    -- Specify more columns here
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
	[IsForSale] BIT NOT NULL,
	[IsRgb] BIT NOT NULL,
	[Description] NVARCHAR(1000) NOT NULL,
	[ImageUrl] NVARCHAR(1000) NOT NULL,
	[OwnerId] INT NOT NULL
        FOREIGN KEY (OwnerId)
        REFERENCES [User] (Id)
);
GO

-- Insert rows into table 'Product' in schema '[dbo]'
INSERT INTO [dbo].[Product]
( -- Columns to insert data into
 [Title], [Category], [RentalPrice], [SalesPrice], [IsForSale], [IsRgb], [Description], [ImageUrl], [OwnerId]
)
VALUES
( -- First row: values for the columns in the list above
 'Corsair Mouse', 2, '103200', '236700', 1, 1, 'This is a cool rgb mouse', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHPKJOHDk6uKF0_a-pcD4ik_lEPBLd1KyNJMLmYvh3ZXk4J6uTjw&s', 2
),
( -- Second row: values for the columns in the list above
 'Logitech Keyboard', 2, '133200', '256700', 1, 0, 'Awsome ergonomic keyboard', 'https://c1.neweggimages.com/ProductImage/23-126-076-07.jpg', 1
),
( -- Third row: values for the columns in the list above
 'RGB Crib', 3, '2033200', '0', 0, 1, 'Nice crib with all rgb stuff', 'https://i.pinimg.com/originals/70/ff/99/70ff998f92d899c8206254985e43f143.jpg', 3
),
( -- Fourth row: values for the columns in the list above
 'Nvidia GTX 1080', 1, '0', '4036700', 1, 0, 'Top notch graphics card', 'https://i.imgur.com/Mo75nLO.jpg', 2
)
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
    [Status] NVARCHAR(50)
);
GO

INSERT INTO [dbo].[Order]
(
    [CustomerId], [Date], [Total], [Status]
)
VALUES
-- DATETIME FORMAT = YYYYMMDD HH:MM:SS AM/PM
(
    1, '20001231 11:59:59 PM', 1000, 'Status 1'
),
(
    2, '20120710 12:00:00 PM', 2000, 'Status 2'
),
(
    3, '20180418 07:11:30 AM', 3000, 'Status 3'
),
(
    4, '20191120 6:00:00 AM', 4000, 'Status 4'
)
GO
