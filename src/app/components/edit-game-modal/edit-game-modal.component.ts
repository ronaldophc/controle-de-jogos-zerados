import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-edit-game-modal',
  templateUrl: './edit-game-modal.component.html',
  styleUrls: ['./edit-game-modal.component.css'],
})
export class EditGameModalComponent {
  gameForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditGameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameService: GameService
  ) {
    this.gameForm = new FormGroup({
      game: new FormControl(data.game.game, Validators.required),
      platform: new FormControl(data.game.platform, Validators.required),
      startDate: new FormControl(data.game.startDate, Validators.required),
      endDate: new FormControl(data.game.endDate, Validators.required),
      playTime: new FormControl(data.game.playTime, Validators.required),
    });
  }

  onSubmit(): void {
    if (this.gameForm.valid) {
      const updatedGame = {
        ...this.data.game,
        ...this.gameForm.value,
      };

      this.gameService.updateGame(updatedGame).subscribe(
        (response) => {
          console.log('Game updated successfully:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating game:', error);
          this.dialogRef.close(false);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
