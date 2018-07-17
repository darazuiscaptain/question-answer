CREATE TABLE [dbo].[users] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [Email]    VARCHAR (50) NOT NULL,
    [Password] VARCHAR (50) NOT NULL,
    [Score]    INT          DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

