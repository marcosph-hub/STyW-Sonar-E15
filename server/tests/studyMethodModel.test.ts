import StudyMethodModel from '../models/studyMethodModel';

describe('StudyMethod Model', () => {
  it('should require a name', () => {
    const method = new StudyMethodModel({
      description: 'Técnica para mejorar la productividad',
      defaultSettings: {
        workDuration: 25,
        breakDuration: 5,
      },
    });

    const error = method.validateSync();
    expect(error?.errors['name']).toBeDefined();
  });

  it('should require a description', () => {
    const method = new StudyMethodModel({
      name: 'Pomodoro',
      defaultSettings: {
        workDuration: 25,
        breakDuration: 5,
      },
    });

    const error = method.validateSync();
    expect(error?.errors['description']).toBeDefined();
  });

  it('should require default settings with work and break durations', () => {
    const method = new StudyMethodModel({
      name: 'Pomodoro',
      description: 'Técnica para mejorar la productividad',
    });

    const error = method.validateSync();
    expect(error?.errors['defaultSettings.workDuration']).toBeDefined();
    expect(error?.errors['defaultSettings.breakDuration']).toBeDefined();
  });

  it('should save a valid study method', async () => {
    const method = new StudyMethodModel({
      name: 'Pomodoro',
      description: 'Técnica para mejorar la productividad',
      defaultSettings: {
        workDuration: 25,
        breakDuration: 5,
      },
    });

    const savedMethod = await method.save();
    expect(savedMethod._id).toBeDefined();
    expect(savedMethod.name).toBe('Pomodoro');
  });
});
