const boom = require('@hapi/boom');

class AinsService {
  constructor() {
    this.ains = [
      { id: 1, name: 'vale', arains: 2000 },
      { id: 2, name: 'cryz', arains: 1000 },
    ];
  }

  async find() {
    return this.ains;
  }

  async findOne(id) {
    const ains = this.ains.find((item) => item.id === id);
    if (!ains) {
      throw boom.notFound('Ains not found');
    }
    return ains;
  }

  async create(data) {
    const newAins = {
      id: 3,
      ...data,
    };
    this.ains.push(newAins);
    return newAins;
  }

  async update(id, changes) {
    const index = this.ains.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Ains not found');
    }
    const ain = this.ains[index];
    this.ains[index] = {
      ...ain,
      ...changes,
    };
    return this.ains[index];
  }

  async delete(id) {
    const index = this.ains.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Ains not found');
    }
    this.ains.splice(index, 1);
    return { message: 'Ains deleted', id };
  }
}

module.exports = AinsService;
