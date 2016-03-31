class WorkoutRunnerPage{
    description: any;
    steps: any;
    videos: any;
    pauseResume;
    exerciseHeading;
    workoutTimeRemaining;
    exerciseTimeRemaining;

    constructor(){
        this.description = element(by.binding("currentExercise.details.description"));
        this.steps = element(by.binding("currentExercise.details.procedure"));
        this.videos = element.all(by.repeater("video in currentExercise.details.related.videos"));
        this.pauseResume = element(by.id("pause-overlay"));
        this.exerciseHeading = element(by.binding("currentExercise.details.title"));
        this.workoutTimeRemaining = element(by.binding("workoutTimeRemaining"))
        this.exerciseTimeRemaining = element(by.binding("currentExercise.duration-currentExerciseDuration"));
    }
};

describe("Workout Runner", () => {

    describe("Start Page", () => {
        beforeEach(() => {
            browser.get("");
        });
        it("should load the start page.", () => {
            expect(browser.getTitle()).toBe("7 Minute Workout");
            expect(element(by.id("start")).getText()).toBe("Select Workout");
        });

        xit("should search workout with specific name.", () => {
            var filteredWorkouts = element.all(by.repeater("workout in workouts"));
            expect(filteredWorkouts.count()).toEqual(2);

            var searchInput = element(by.model("workoutSearch"));
            searchInput.sendKeys("test");

            expect(filteredWorkouts.count()).toEqual(1);
            expect(filteredWorkouts.first().element(by.css(".title")).getText()).toBe("A test Workout");
        });

        xit("should navigate to workout runner.", () => {
            var filteredWorkouts = element.all(by.repeater("workout in workouts"));
            filteredWorkouts.first().click();
            expect(browser.getCurrentUrl()).toContain("/workout/7minworkout");
        });

    });

    describe("Workout Runner page", () => {
        beforeEach(() => {
            browser.get("#/workout/7minworkout");
        });

        xit("should pause workout when paused button clicked", () => {
            var page = new WorkoutRunnerPage(),
                timeRemaining;

            page.pauseResume.click();
            expect(page.pauseResume.all(by.css(".glyphicon-play")).count()).toBe(1);
            expect(page.pauseResume.all(by.css(".glyphicon-pause")).count()).toBe(0);

            page.exerciseTimeRemaining.getText().then(() => {
                timeRemaining = time;
                browser.sleep(3000);
            });
            page.exerciseTimeRemaining.getText().then(() => {
                expect(page.exerciseTimeRemaining.getText()).toBe(timeRemaining);
            });

        });

        xit("should load workout data", () => {
            var page = new WorkoutRunnerPage();
            page.pauseResume.click();
            expect(page.description.getText()).toBe("The basic crunch is a abdominal exercise in a strength-training program.");
            expect(page.exerciseHeading.getText()).toBe("Abdominal Crunches");
            expect(page.videos.count()).toBe(2);
        });

        xit("should transition exercise when time lapses.", () => {
            var page = new WorkoutRunnerPage();
            browser.sleep(5000);
            page.pauseResume.click();
            expect(page.videos.count()).toBe(0);
            expect(page.description.getText()).toBe("Relax a bit!");
            expect(page.exerciseHeading.getText()).toBe("Relax!");
        });

        xit("should end workout when time completes", () => {
            var page = new WorkoutRunnerPage();
            browser.sleep(20000);
            expect(browser.getCurrentUrl()).toContain("/finish");
        });
    });
});
