describe ('connect to test db', () => {

    it ('can connect to db', () => {
        cy.task(
            "queryDb",
            "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
        );
    });

    it('Input entries', () => {
        cy.task(
            "queryDb",
            `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
            (1, "Ivan", "02-2022", "Barcelona"),
            (2, "Kate", "03-2022", "Moscow"),
            (3, "Irina", "02-2023", "Paris"),
            (4, "Nick", "02-2022", "Oslo");`
            ).then((result) => {
                cy.log(JSON.stringify(result));
                expect(result.affectedRows).to.equal(4);
            })
    });
    
    it('select', () => {
        cy.task(
            "queryDb",
            `SELECT FirstName FROM Students WHERE City="Moscow"`
        ).then((result) => {
            cy.log(JSON.stringify(result));
            expect(result[0].FirstName).to.equal("Kate");
        })
    });

    it('add students', () => {
        cy.task(
            "queryDb",
            `INSERT INTO Students VALUES
            (5, "Michail", "03-2022", "Riga"),
            (6, "Vic", "03-2022", "Rome");`
        ).then((result) => {
            cy.log(JSON.stringify(result));
            expect(result.affectedRows).to.equal(2);
        })
    });

    it ('select StudentGroup', () => {
        cy.task(
            "queryDb",
            `SELECT FirstName FROM Students WHERE StudentGroup="03-2022"`
        ).then((result) => {
            expect(Object.keys(result).length).to.equal(3);
            })
    });

    it ('can delete the db', () => {
        cy.task(
            "queryDb", 
            "DROP TABLE Students"
        );
    })

})