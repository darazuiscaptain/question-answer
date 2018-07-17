CREATE TABLE [dbo].[Questions] (
    [Id]     INT          IDENTITY (1, 1) NOT NULL,
    [Title]  VARCHAR (50) NOT NULL,
    [Body]   TEXT         NOT NULL,
    [Time]   VARCHAR (50) NOT NULL,
    [userId] INT          NOT NULL,
    [vote]   INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Questions_ToTable] FOREIGN KEY ([userId]) REFERENCES [dbo].[users] ([Id])
);

