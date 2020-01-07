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
IF OBJECT_ID('[dbo].[Feedback]', 'U') IS NOT NULL

DROP TABLE [dbo].[Feedback]
GO

CREATE TABLE [dbo].[Review]
( 
 [ReviewId] INT NOT NULL PRIMARY KEY,
 [Review] NVARCHAR (1200),
 [ReviewerId] INT NULL,
 [ReviewDate] DATE NOT NULL,
 FOREIGN KEY (ReviewerId) REFERENCES [User](Id)
 [ProductReview] NVARCHAR (1200) NULL,
 FOREIGN KEY (ProductReview) REFERENCES [PRODUCT](Id)
)


INSERT INTO [feedback] ([FeedbackId], [Feedback], [ReviewerId], [ReviewDate])
VALUES 
( -- First row: values for the columns in the list above
    1, 'Awesome Item', 2, '2019-01-01'
),
( -- Second row: values for the columns in the list above
    2, 'Very good condition', 3, '2018-01-01'
),
( -- Third row: values for the columns in the list above
    3, 'Never buying/renting from this guy, again', 4, '2020-01-01'
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
	[DateCreated] DATETIME2 NOT NULL DEFAULT GETDATE(),
	[OwnerId] INT NOT NULL
        FOREIGN KEY (OwnerId)
        REFERENCES [User] (Id)
);
GO

-- Insert rows into table 'Product' in schema '[dbo]'
INSERT INTO [dbo].[Product]
([Title], [Category], [RentalPrice], [SalesPrice], [IsForSale], [IsRgb], [Description], [DateCreated], [OwnerId], [ImageUrl])
VALUES --categories part 1, peripheral 2, space 3, system 4
('Corsair Mouse', 2, '103200', '236700', 1, 1, 'cool corsair mouse', dateadd(day,-1, getdate()), 2, 'https://m.media-amazon.com/images/I/613J82iVB1L._AC_UL320_ML3_.jpg'),
('Corsair RAM', 1, '103200', '236700', 1, 1, 'fast corsair RAM', dateadd(day,-2, getdate()), 2, 'https://m.media-amazon.com/images/I/91B-Tqxo+PL._AC_UL320_ML3_.jpg'),
('Corsair Headset', 2, '103200', '236700', 1, 1, 'black corsair headset', dateadd(day,-3, getdate()), 2, 'https://m.media-amazon.com/images/I/61vR61h9KdL._AC_UL320_ML3_.jpg'),
('Corsair Keyboard', 2, '103200', '236700', 1, 1, 'cool corsair keyboard', dateadd(day,-4, getdate()), 2, 'https://m.media-amazon.com/images/I/71eARwGvFaL._AC_UL320_ML3_.jpg'),
('Corsair CPU Cooler', 1, '103200', '236700', 1, 1, 'rbg corsair cpu cooler', dateadd(day,-5, getdate()), 2, 'https://m.media-amazon.com/images/I/51WqefOWisL._AC_UY218_ML3_.jpg'),
('Corsair Headset Stand', 2, '103200', '236700', 1, 1, 'cool corsair headset stand', dateadd(day,-6, getdate()), 2, 'https://m.media-amazon.com/images/I/51lh-DEa5NL._AC_UY218_ML3_.jpg'),
('Logitech Keyboard', 2, '133200', '256700', 1, 0, 'cool logitech keyboard', dateadd(day,-7, getdate()), 1, 'https://m.media-amazon.com/images/I/71goKxqBHnL._AC_UY218_ML3_.jpg'),
('Logitech Webcam', 2, '133200', '256700', 1, 0, 'good logitech webcam', dateadd(day,-8, getdate()), 1, 'https://m.media-amazon.com/images/I/91SNDNgjSiL._AC_UL320_ML3_.jpg'),
('Logitech Mouse', 2, '133200', '256700', 1, 0, 'cool logitech mouse', dateadd(day,-9, getdate()), 1, 'https://m.media-amazon.com/images/I/71BmDZ6u22L._AC_UL320_ML3_.jpg'),
('Logitech Racing Wheel', 2, '133200', '256700', 1, 0, 'awsome logitech racing wheel', dateadd(day,-10, getdate()), 1, 'https://m.media-amazon.com/images/I/51KQqdl5azL._AC_UY218_ML3_.jpg'),
('Alienware Laptop', 4, '133200', '256700', 1, 0, 'expensive alienware laptop', dateadd(day,-11, getdate()), 1, 'https://m.media-amazon.com/images/I/71J7q3UpQnL._AC_UL320_ML3_.jpg'),
('Alienware Monitor', 2, '133200', '256700', 1, 0, 'expensive alienware monitor', dateadd(day,-12, getdate()), 1, 'https://m.media-amazon.com/images/I/71l+Z8gJMIL._AC_UL320_ML3_.jpg'),
('Alienware PC', 4, '133200', '256700', 1, 0, 'expensive alienware pc', dateadd(day,-13, getdate()), 1, 'https://m.media-amazon.com/images/I/71Bu3+vAWGL._AC_UY218_ML3_.jpg'),
('NVIDIA RTX 2080', 1, '133200', '256700', 1, 0, 'fast nvidia rtx 2080', dateadd(day,-14, getdate()), 1, 'https://m.media-amazon.com/images/I/61VkiYYGMhL._AC_UY218_ML3_.jpg'),
('NVIDIA RTX 2070', 1, '133200', '256700', 1, 0, 'fast nvidia rtx 2070', dateadd(day,-15, getdate()), 1, 'https://m.media-amazon.com/images/I/71WA8Pm9AoL._AC_UY218_ML3_.jpg'),
('NVIDIA Shield', 4, '133200', '256700', 1, 0, 'cool nvidia shield', dateadd(day,-16, getdate()), 1, 'https://m.media-amazon.com/images/I/61BbVbSSNuL._AC_UY218_ML3_.jpg'),
('Intel Core i7', 1, '133200', '256700', 1, 0, 'nice intel core i7', dateadd(day,-17, getdate()), 1, 'https://m.media-amazon.com/images/I/71Q5sdPHD-L._AC_UL320_ML3_.jpg'),
('Intel Core i5', 1, '133200', '256700', 1, 0, 'alright intel core i5', dateadd(day,-18, getdate()), 1, 'https://m.media-amazon.com/images/I/71709S6VMTL._AC_UL320_ML3_.jpg'),
('Intel Core i9', 1, '133200', '256700', 1, 0, 'nextgen intel core i9', dateadd(day,-19, getdate()), 1, 'https://m.media-amazon.com/images/I/71Tor75VsGL._AC_UL320_ML3_.jpg'),
('Samsung SSD', 1, '133200', '256700', 1, 0, 'fast samsung ssd', dateadd(day,-20, getdate()), 1, 'https://m.media-amazon.com/images/I/914Zq+CIeML._AC_UL320_ML3_.jpg'),
('Samsung 65inch TV', 2, '133200', '256700', 1, 0, 'big samsung 65inch tv', dateadd(day,-21, getdate()), 1, 'https://m.media-amazon.com/images/I/91rhYwnuu7L._AC_UY218_ML3_.jpg'),
('Samsung Chromebook', 4, '133200', '256700', 1, 0, 'cool samsung chromebook', dateadd(day,-22, getdate()), 1, 'https://m.media-amazon.com/images/I/81mX-4s+guL._AC_UY218_ML3_.jpg'),
('Oculus Rift S', 2, '133200', '256700', 1, 0, 'cool oculus rift s', dateadd(day,-23, getdate()), 1, 'https://m.media-amazon.com/images/I/71URNvzoWqL._AC_UY218_ML3_.jpg'),
('Oculus Go', 2, '2033200', '0', 0, 1, 'cool oculus go', dateadd(day,-24, getdate()), 3, 'https://m.media-amazon.com/images/I/610iXon9LfL._AC_UY218_ML3_.jpg'),
('Oculus Quest', 2, '0', '4036700', 1, 0, 'cool oculus quest', dateadd(day,-25, getdate()), 2, 'https://m.media-amazon.com/images/I/71D9OsZmWxL._AC_UY218_ML3_.jpg')
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
    [Duration] INT
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