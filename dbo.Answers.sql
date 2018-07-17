CREATE TABLE [dbo].[Answers] (
    [Id]         INT          IDENTITY (1, 1) NOT NULL,
    [Answer]     TEXT         NOT NULL,
    [Time]       VARCHAR (50) NOT NULL,
    [userId]     INT          NOT NULL,
    [questionId] INT          NOT NULL,
    [vote]       INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Answers_ToTable_1] FOREIGN KEY ([questionId]) REFERENCES [dbo].[Questions] ([Id]),
    CONSTRAINT [FK_Answers_ToTable] FOREIGN KEY ([userId]) REFERENCES [dbo].[users] ([Id])
);

