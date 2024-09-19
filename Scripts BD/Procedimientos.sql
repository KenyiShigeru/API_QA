USE QualityArt;
GO

EXEC RegistrarVenta 
    @id_Cliente = 1,
    @id_FormaPago = 2,
    @total = 1500.00,
    @montoPagado = 1200.00;
go

-- Creación del procedimiento almacenado para registrar una venta
CREATE or alter PROCEDURE RegistrarVenta
    @id_Cliente INT,
    @id_FormaPago INT,
    @total MONEY,
    @montoPagado MONEY
AS
BEGIN
    -- Inicio de la transacción
    BEGIN TRANSACTION;
    
    BEGIN TRY
        -- Verificar si el cliente y la forma de pago existen
        IF NOT EXISTS (SELECT 1 FROM Cliente WHERE id_Cliente = @id_Cliente)
        BEGIN
            RAISERROR('El cliente especificado no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        
        IF NOT EXISTS (SELECT 1 FROM Forma_Pago WHERE id_FormaPago = @id_FormaPago)
        BEGIN
            RAISERROR('La forma de pago especificada no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Calcular el saldo pendiente
        DECLARE @saldoPendiente MONEY;
        SET @saldoPendiente = @total - @montoPagado;

        -- Insertar una nueva venta en la tabla Venta
        INSERT INTO Venta (id_Cliente, id_FormaPago, total, saldoPendiente)
        VALUES (@id_Cliente, @id_FormaPago, @total, @saldoPendiente);

        -- Confirmar la transacción
        COMMIT TRANSACTION;
        
        -- Devolver un mensaje de éxito
        PRINT 'Venta registrada exitosamente';
    END TRY
    BEGIN CATCH
        -- En caso de error, revertir la transacción
        ROLLBACK TRANSACTION;
        
        -- Devolver un mensaje de error
        PRINT 'Error al registrar la venta ' + ERROR_MESSAGE();
    END CATCH
END;
GO
