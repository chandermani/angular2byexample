import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {ExercisePlan, WorkoutPlan, Exercise} from './model';

@Injectable()
export class WorkoutService {
    public workouts: Array<WorkoutPlan> = [];
    public exercises: Array<Exercise> = [];
    public workout: WorkoutPlan;
    private _collectionsUrl = 'https://api.mongolab.com/api/1/databases/personaltrainer/collections';
    private _apiKey = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
    private _params = '?apiKey=' + this._apiKey;

    constructor(private _http: Http) {
    }

    getExercises(){
        return this._http.get(this._collectionsUrl + '/exercises' + this._params)
            .map((res: Response) => <Exercise[]>res.json())
            .catch(this.handleError);
    }

    getExercise(exerciseName: string){
        return this._http.get(this._collectionsUrl + '/exercises/'+ exerciseName  + this._params)
            .map((res: Response) => <Exercise>res.json())
            .catch(this.handleError);
    }

    updateExercise(exercise: Exercise){
        for (var i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].name === exercise.name) {
                this.exercises[i] = exercise;
            }
        }
        return exercise;
    }

    addExercise(exercise: Exercise){
        if (exercise.name) {
            this.exercises.push(exercise);
            return exercise;
        }
    }

    deleteExercise(exerciseName: string) {
        let exerciseIndex:number;
        for (var i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].name === exerciseName) {
                exerciseIndex = i;
            }
        }
        if (exerciseIndex >= 0) this.exercises.splice(exerciseIndex, 1);
    }

    getWorkouts(){
    return this._http.get(this._collectionsUrl + '/workouts' + this._params)
        .map((res:Response) => <WorkoutPlan[]>res.json())
        .map((workouts: Array<any>) => {
            let result:Array<WorkoutPlan> = [];
            if (workouts) {
                workouts.forEach((workout) => {
                    result.push(
                        new WorkoutPlan(
                            workout.name,
                            workout.title,
                            workout.restBetweenExercise,
                            workout.exercises,
                            workout.description
                        ));
                });
            }
         return result;
         })
        .catch(this.handleError);
    }

    getWorkout(workoutName:string) {
        return Observable.forkJoin(
            this._http.get(this._collectionsUrl + '/exercises' + this._params).map((res: Response) => <Exercise[]>res.json()),
            this._http.get(this._collectionsUrl + '/workouts/' + workoutName + this._params).map((res:Response) => <WorkoutPlan>res.json())
         ).map(
            data =>{
                let allExercises = data[0];
                let workout = new WorkoutPlan(
                    data[1].name,
                    data[1].title,
                    data[1].restBetweenExercise,
                    data[1].exercises,
                    data[1].description
                )
                workout.exercises.forEach(
                    (exercise: ExercisePlan) => exercise.exercise = allExercises.find(
                        (x: any) => x.name === exercise.name
                    )
                )
                return workout;
            }
        )
        //.do(result => console.log(JSON.stringify(result, undefined, 2)))
        .catch(this.handleError);
     }

    addWorkout (workout: any)  {
        let workoutExercises: any = [];
        workout.exercises.forEach(
            (exercisePlan: any) => {workoutExercises.push({ name: exercisePlan.exercise.name, duration: exercisePlan.duration })}
        );

        let body = JSON.stringify({
            "_id": workout.name,
            "exercises": workoutExercises,
            "name": workout.name,
            "title": workout.title,
            "description": workout.description,
            "restBetweenExercise": workout.restBetweenExercise
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._collectionsUrl + '/workouts' + this._params, body, options)
            .map((res: Response) =>  res.json())
            .catch(this.handleError)
            .subscribe();
    }

    updateWorkout(workout: WorkoutPlan){
        let workoutExercises: any = [];
        workout.exercises.forEach(
            (exercisePlan: any) => {workoutExercises.push({ name: exercisePlan.exercise.name, duration: exercisePlan.duration })}
        );

        let body = JSON.stringify({
            "_id": workout.name,
            "exercises": workoutExercises,
            "name": workout.name,
            "title": workout.title,
            "description": workout.description,
            "restBetweenExercise": workout.restBetweenExercise
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this._collectionsUrl + '/workouts/' + workout.name + this._params, body, options)
            .map((res: Response) =>  res.json())
            .catch(this.handleError)
            .subscribe();
    }

    deleteWorkout(workoutName: string) {
        return this._http.delete(this._collectionsUrl + '/workouts/'+ workoutName  + this._params)
            .map((res: Response) => res.json())
            .catch(this.handleError)
            .subscribe();
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
