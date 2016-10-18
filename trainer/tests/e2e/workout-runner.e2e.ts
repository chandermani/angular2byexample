/// <reference path="../../typings/index.d.ts"/>

class WorkoutRunnerPage{
    pauseResume: any;
    playButton: any;
    pauseButton: any;
    exerciseTitle: any;
    exerciseDescription: any;
    exerciseTimeRemaining; any;

    constructor(){
        this.pauseResume =  element.all(by.id('pause-overlay'));
        this.playButton = element.all(by.css('.glyphicon-play'));
        this.pauseButton = element.all(by.css('.glyphicon-pause'));
        this.exerciseTitle = element.all(by.css('.workout-display-div h1')).getAttribute('value');
        this.exerciseDescription = element.all(by.id('description-panel')).getAttribute('value');
        this.exerciseTimeRemaining = element.all(by.css('.workout-display-div h4')).getAttribute('value');
    }
};

describe("Workout Runner", () => {

    describe("Start Page", () => {
        beforeEach(() => {
            browser.get("");
        });
        it("should load the start page.", () => {
            expect(browser.getTitle()).toBe("Personal Trainer");
            expect(element(by.id("start")).getText()).toBe("Select Workout");
        });

        it("should search workout with specific name.", () => {
            var filteredWorkouts = element.all(by.css(".workout.tile"));
            expect(filteredWorkouts.count()).toEqual(2);

            var searchInput = element(by.css(".form-control"));
            searchInput.sendKeys("1 Minute Workout");

            expect(filteredWorkouts.count()).toEqual(1);
            expect(filteredWorkouts.first().element(by.css(".title")).getText()).toBe("1 Minute Workout");
        });

        it("should navigate to workout runner.", () => {
            var filteredWorkouts = element.all(by.css(".workout.tile"));
            filteredWorkouts.first().click();
            expect(browser.getCurrentUrl()).toContain("/workout/1minworkout");
        });
    });

    describe("Workout Runner page", () => {
        beforeEach(() => {
            browser.get("#/workout/1minworkout");
        });

        it("should load workout data", () => {
            var page = new WorkoutRunnerPage();
            page.pauseResume.click();
            expect(page.exerciseTitle).toBe['Jumping Jacks'];
            expect(page.exerciseDescription).toBe["A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise."];
        });

        it("should pause workout when paused button clicked", () => {
            let page = new WorkoutRunnerPage(),
                timeRemaining;

            page.pauseResume.click();
            expect(page.playButton.count()).toBe(1);
            expect(page.pauseButton.count()).toBe(0);

            page.exerciseTimeRemaining.then((time)=> {
                timeRemaining = time;
                browser.sleep(3000);
            });
            page.exerciseTimeRemaining.then((time)=> {
                expect(page.exerciseTimeRemaining).toBe(timeRemaining);
            });
        });

        it("should transition exercise when time lapses.", () => {
            var page = new WorkoutRunnerPage();
            browser.sleep(15000);
            page.pauseResume.click();
            expect(page.exerciseTitle).toBe["Relax!"];
            expect(page.exerciseDescription).toBe["Relax a bit!"];
        });
    });
});
