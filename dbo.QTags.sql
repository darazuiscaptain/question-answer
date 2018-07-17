CREATE TABLE [dbo].[QTags] (
    [Id]         INT IDENTITY (1, 1) NOT NULL,
    [TagId]      INT NOT NULL,
    [questionId] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Table_ToTable] FOREIGN KEY ([TagId]) REFERENCES [dbo].[Tags] ([Id]),
    CONSTRAINT [FK_QTags_ToTable] FOREIGN KEY ([questionId]) REFERENCES [dbo].[Questions] ([Id])
);

