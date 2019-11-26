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
	[Username] nvarchar(50) not null,
	[Email] nvarchar(320) not null,
	[City] nvarchar (50) not null,
	[State] nvarchar (50) not null
	[Bio] nvarchar (1200) null
)

GO

-- Insert rows into table 'PaymentType' in schema '[dbo]'
INSERT INTO [dbo].[User]
( -- Columns to insert data into
 [Username], [Email], [City], [State]
)
VALUES
( -- First row: values for the columns in the list above
'rOCKsTEADY', 'steadyrockin@underwhelms.com', 'Nashville', 'TN', 'Bio info'
),
( -- Second row: values for the columns in the list above
 'BeeBop', 'beeboppin@underwhelms.com', 'Chattanooga', 'TN', 'Bio info'
),
( -- Third row: values for the columns in the list above
 'JankyPromo', 'screechin@cowmilk.com', 'Nashville', 'TN', 'Bio info'
),
( -- Fourth row: values for the columns in the list above
 'iLLGates', 'smokingsauasge@coolkids.com', 'Memphis', 'TN', 'Bio info'
)
GO