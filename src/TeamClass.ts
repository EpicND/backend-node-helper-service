class Team {
  public teamNumber: number;
  private teamFullScore: number;
  private gamesPlayed: number;
  private gamesWon: number;

  constructor(number: number) {
    this.teamNumber = number;
  }

  /**
   * **Returns** the average by dividing total score by games played
   */
  public getAverage(): number {
    return this.teamFullScore / this.gamesPlayed;
  }

  public getWLRatio(): number {
    return this.gamesWon / this.gamesPlayed;
  }

  public addGamePlayed(): void {
    this.gamesPlayed++;
  }

  public addScore(points: number) {
    this.teamFullScore += points;
  }

  public setGamesPlayed(gamesPlayed: number): void {
    this.gamesPlayed = gamesPlayed;
  }

  public setGamesWon(gamesWon: number): void {
    this.gamesWon = gamesWon;
  }
  public addGameWon(gameWon: number): void {
    this.gamesWon += gameWon;
  }
}

export default Team;
